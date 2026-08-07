# -*- coding: utf-8 -*-
"""生成实验汇报书所需全部数据图表（数据源：report/data_export.json）"""
import json, os
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
from matplotlib.colors import LinearSegmentedColormap

plt.rcParams["font.sans-serif"] = ["Microsoft YaHei", "SimHei"]
plt.rcParams["axes.unicode_minus"] = False
plt.rcParams["figure.dpi"] = 150

D = json.load(open(os.path.join(os.path.dirname(__file__), "..", "report", "data_export.json"), encoding="utf8"))
EXPERTS = D["experts"]; CAT = D["CAT"]; CAT_STATS = D["CAT_STATS"]; AUTH_STATS = D["AUTH_STATS"]
SCHOOLS = D["SCHOOLS"]; DOMAIN = D["DOMAIN"]; TIERS = D["TIERS"]; CLUSTER_ORDER = D["CLUSTER_ORDER"]
N = D["meta"]["nExperts"]; TOTAL = D["meta"]["totalViewpoints"]
CAT_KEYS = list(CAT.keys())

S = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#3faa3f", "#9085e9", "#e66767"]
TIER_COLOR = {"高效度": "#199e70", "中效度": "#c98500", "低效度": "#e66767"}
FIG = os.path.join(os.path.dirname(__file__), "..", "report", "figures")
os.makedirs(FIG, exist_ok=True)

def save(fig, name):
    fig.savefig(os.path.join(FIG, name), bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print("saved", name)

# ---------- 预计算 ----------
# 每位专家在每个节点上的观点条数
hit = {e["id"]: {k: sum(1 for v in e["viewpoints"] if k in v["c"]) for k in CAT_KEYS} for e in EXPERTS}
# 每个节点下观点数（含重复标签的条数）
vp_by_cat = {k: sum(1 for e in EXPERTS for v in e["viewpoints"] if k in v["c"]) for k in CAT_KEYS}
# 每个节点真实性构成
auth_by_cat = {k: {"亲历": 0, "借鉴": 0, "共识": 0} for k in CAT_KEYS}
for e in EXPERTS:
    for v in e["viewpoints"]:
        for k in v["c"]:
            auth_by_cat[k][v["auth"]] += 1
# 实践型/知识型（与 gen_analysis.js 的 PTYPE 定义一致）
practice_ids = {"waitzkin","leonard","kasparov","kobe","serena","federer","rams","adria","torvalds","musashi","goggins","biles"}
pN = len(practice_ids); kN = N - pN
ptype_hit = {k: (sum(1 for e in EXPERTS if e["id"] in practice_ids and hit[e["id"]][k] > 0),
                 sum(1 for e in EXPERTS if e["id"] not in practice_ids and hit[e["id"]][k] > 0)) for k in CAT_KEYS}
# 领域簇
cluster_members = {cl: [e for e in EXPERTS if DOMAIN[e["id"]]["cluster"] == cl] for cl in CLUSTER_ORDER}
cluster_tier = {cl: DOMAIN[cluster_members[cl][0]["id"]]["tier"] for cl in CLUSTER_ORDER}
cluster_hit = {cl: {k: sum(1 for e in cluster_members[cl] if hit[e["id"]][k] > 0) / max(1, len(cluster_members[cl])) * 100
                    for k in CAT_KEYS} for cl in CLUSTER_ORDER}
# 节点共现（专家级）
cooccur = {}
for a in range(len(CAT_KEYS)):
    for b in range(a + 1, len(CAT_KEYS)):
        ka, kb = CAT_KEYS[a], CAT_KEYS[b]
        c = sum(1 for e in EXPERTS if hit[e["id"]][ka] > 0 and hit[e["id"]][kb] > 0)
        if c >= 8:
            cooccur[(ka, kb)] = c
cooccur = sorted(cooccur.items(), key=lambda x: -x[1])[:10]

# ---------- 图1：17 节点共识度条形图 ----------
order = sorted(CAT_KEYS, key=lambda k: -CAT_STATS[k]["count"])
labels = [f"{k} {CAT[k]}" for k in order]
counts = [CAT_STATS[k]["count"] for k in order]
fig, ax = plt.subplots(figsize=(9.6, 6.8))
bars = ax.barh(range(len(order)), counts, color=[S[i % 8] for i in range(len(order))], height=0.62)
ax.set_yticks(range(len(order))); ax.set_yticklabels(labels, fontsize=8.6)
ax.invert_yaxis()
ax.set_xlim(0, N + 1.5)
for i, c in enumerate(counts):
    ax.text(c + 0.4, i, f"{c}（{c/N*100:.0f}%）", va="center", fontsize=8.6, color="#333")
ax.axvline(N / 2, color="#999", lw=0.8, ls="--")
ax.text(N / 2 + 0.2, len(order) - 0.45, "半数线 (50%)", fontsize=7.5, color="#666")
ax.set_xlabel("命中专家数（N=43）", fontsize=9)
ax.set_title("图1  17 个能力框架节点共识度（按命中专家数降序）", fontsize=11.5, fontweight="bold", pad=10)
ax.spines[["top", "right"]].set_visible(False)
ax.tick_params(axis="y", length=0)
ax.grid(axis="x", color="#e5e5e5", lw=0.6)
ax.set_axisbelow(True)
save(fig, "fig1_consensus.png")

# ---------- 图2：真实性核验总览环形图 ----------
fig, ax = plt.subplots(figsize=(5.6, 4.6))
vals = [AUTH_STATS["亲历"], AUTH_STATS["借鉴"], AUTH_STATS["共识"]]
cols = ["#199e70", "#3987e5", "#c98500"]
wedges, _ = ax.pie(vals, colors=cols, startangle=90, counterclock=False,
                   wedgeprops=dict(width=0.42, edgecolor="white"))
ax.text(0, 0.10, f"{TOTAL}", ha="center", fontsize=20, fontweight="bold")
ax.text(0, -0.16, "观点总数", ha="center", fontsize=9, color="#555")
labels = [f"亲历 {vals[0]}（{vals[0]/TOTAL*100:.0f}%）", f"借鉴 {vals[1]}（{vals[1]/TOTAL*100:.0f}%）",
          f"共识 {vals[2]}（{vals[2]/TOTAL*100:.1f}%）"]
ax.legend(wedges, labels, loc="center left", bbox_to_anchor=(1.0, 0.5), fontsize=9, frameon=False)
ax.set_title("图2  观点真实性核验总体构成（N=303）", fontsize=11.5, fontweight="bold", pad=10)
save(fig, "fig2_auth_total.png")

# ---------- 图3：按节点的真实性核验堆叠条形图 ----------
order3 = sorted(CAT_KEYS, key=lambda k: -vp_by_cat[k])
labels3 = [f"{k} {CAT[k].split('（')[0]}" for k in order3]
tot3 = [vp_by_cat[k] for k in order3]
q = np.array([[auth_by_cat[k]["亲历"], auth_by_cat[k]["借鉴"], auth_by_cat[k]["共识"]] for k in order3])
fig, ax = plt.subplots(figsize=(9.6, 6.4))
bot = np.zeros(len(order3))
for j, (a, c) in enumerate(zip(["亲历", "借鉴", "共识"], cols)):
    ax.barh(range(len(order3)), q[:, j], left=bot, color=c, label=a, height=0.62)
    bot += q[:, j]
ax.set_yticks(range(len(order3))); ax.set_yticklabels(labels3, fontsize=8.6)
ax.invert_yaxis()
ax.set_xlabel("观点条数（同一观点可挂接多个节点，故总数>303）", fontsize=9)
ax.set_title("图3  各节点观点真实性核验构成（亲历 / 借鉴 / 共识）", fontsize=11.5, fontweight="bold", pad=10)
for i, t in enumerate(tot3):
    ax.text(t + 0.5, i, str(t), va="center", fontsize=8.2, color="#333")
ax.legend(loc="lower right", fontsize=9, frameon=False)
ax.spines[["top", "right"]].set_visible(False)
ax.tick_params(axis="y", length=0)
ax.grid(axis="x", color="#e5e5e5", lw=0.6)
ax.set_axisbelow(True)
save(fig, "fig3_auth_by_node.png")

# ---------- 图4：专家 × 节点热力图 ----------
M = np.array([[hit[e["id"]][k] for k in CAT_KEYS] for e in EXPERTS])
M_MAX = int(M.max())  # 动态色标上限（当前数据最大为 5：Goggins×C8、Duckworth×C8）
fig, ax = plt.subplots(figsize=(12.2, 11.2))
cmap = LinearSegmentedColormap.from_list("hw", ["#ffffff", "#dce8f7", "#7fb2e8", "#3987e5", "#123f7a"])
im = ax.imshow(M, cmap=cmap, aspect="auto", vmin=0, vmax=M_MAX)
ax.set_xticks(range(len(CAT_KEYS))); ax.set_xticklabels(CAT_KEYS, fontsize=8)
ax.set_yticks(range(N)); ax.set_yticklabels([e["nameZh"] for e in EXPERTS], fontsize=7.2)
ax.tick_params(length=0)
ax.set_title("图4  专家 × 能力节点命中热力图（格内数字=该专家在该节点的观点条数）", fontsize=11.5, fontweight="bold", pad=10)
for i in range(N):
    for j in range(len(CAT_KEYS)):
        v = M[i, j]
        if v > 0:
            ax.text(j, i, str(v), ha="center", va="center", fontsize=6.2,
                    color="white" if v >= 3 else "#333")
cbar = fig.colorbar(im, ax=ax, fraction=0.025, pad=0.015)
cbar.set_ticks(range(M_MAX + 1))
cbar.set_label("观点条数", fontsize=8.5)
ax.set_xlabel("能力框架节点（C1–C17）", fontsize=9)
ax.set_ylabel("43 位专家", fontsize=9)
save(fig, "fig4_expert_heatmap.png")

# ---------- 图5：领域簇 × 节点热力矩阵（按反馈效度分组） ----------
K = np.array([[cluster_hit[cl][k] for k in CAT_KEYS] for cl in CLUSTER_ORDER])
fig, ax = plt.subplots(figsize=(12.2, 6.4))
cmap2 = LinearSegmentedColormap.from_list("hw2", ["#ffffff", "#fde9d8", "#f5b98a", "#e66767", "#7a1f1f"])
im = ax.imshow(K, cmap=cmap2, aspect="auto", vmin=0, vmax=100)
# 注：cluster_tier 由簇首成员推断（当前数据每簇档位一致；若数据变更需复核）
ax.set_xticks(range(len(CAT_KEYS))); ax.set_xticklabels(CAT_KEYS, fontsize=8.5)
ax.set_yticks(range(len(CLUSTER_ORDER)))
ax.set_yticklabels([f"{cl} · {t} · {len(cluster_members[cl])}人" for cl, t in
                    [(cl, cluster_tier[cl]) for cl in CLUSTER_ORDER]], fontsize=8)
for i, cl in enumerate(CLUSTER_ORDER):
    ax.get_yticklabels()[i].set_color(TIER_COLOR[cluster_tier[cl]])
for i in range(len(CLUSTER_ORDER)):
    for j in range(len(CAT_KEYS)):
        v = K[i, j]
        if v > 0:
            ax.text(j, i, f"{v:.0f}", ha="center", va="center", fontsize=7,
                    color="white" if v >= 60 else "#333")
cbar = fig.colorbar(im, ax=ax, fraction=0.025, pad=0.015)
cbar.set_label("簇内专家命中率 %", fontsize=8.5)
ax.set_title("图5  领域簇 × 能力节点命中率矩阵（按反馈效度三档分组着色）", fontsize=11.5, fontweight="bold", pad=10)
save(fig, "fig5_cluster_heatmap.png")

# ---------- 图6：实践型 vs 知识型节点命中率对比 ----------
rows6 = []
for k in CAT_KEYS:
    p, kn = ptype_hit[k]
    rows6.append((k, p / pN * 100, kn / kN * 100, abs(p / pN - kn / kN)))
rows6.sort(key=lambda x: -x[3])
labels6 = [f"{k} {CAT[k].split('（')[0]}" for k, _, _, _ in rows6]
pp = [x[1] for x in rows6]; kp = [x[2] for x in rows6]
fig, ax = plt.subplots(figsize=(9.6, 6.6))
y = np.arange(len(rows6))
ax.barh(y + 0.2, pp, height=0.38, color=S[0], label=f"实践型（n={pN}）")
ax.barh(y - 0.2, kp, height=0.38, color=S[1], label=f"知识型（n={kN}）")
ax.set_yticks(y); ax.set_yticklabels(labels6, fontsize=8.6)
ax.invert_yaxis()
ax.set_xlabel("节点命中率（%）", fontsize=9)
ax.set_title("图6  实践型 vs 知识型专家在各节点的命中率（按差异降序）", fontsize=11.5, fontweight="bold", pad=10)
ax.legend(loc="lower right", fontsize=9, frameon=False)
ax.spines[["top", "right"]].set_visible(False)
ax.tick_params(axis="y", length=0)
ax.grid(axis="x", color="#e5e5e5", lw=0.6)
ax.set_axisbelow(True)
save(fig, "fig6_ptype.png")

# ---------- 图7：人口统计画像（2×2） ----------
fig, axes = plt.subplots(2, 2, figsize=(11.5, 7.4))
def dist(key):
    m = {}
    for e in EXPERTS:
        m[e[key]] = m.get(e[key], 0) + 1
    return m
# 性别
g = dist("gender"); keys = list(g.keys())
axes[0][0].bar(keys, [g[k] for k in keys], color=[S[5], S[4]], width=0.45)
for i, k in enumerate(keys):
    axes[0][0].text(i, g[k] + 0.3, str(g[k]), ha="center", fontsize=9)
axes[0][0].set_title("性别构成", fontsize=10.5, fontweight="bold")
axes[0][0].set_ylim(0, 36)
axes[0][0].spines[["top", "right"]].set_visible(False)
# 年龄段
ab = dist("ageBracket")
brackets = ["30-49", "50-64", "65+"]
abv = [ab.get(b, 0) for b in brackets]
axes[0][1].bar(brackets, abv, color=[S[0], S[2], S[6]], width=0.5)
for i, v in enumerate(abv):
    axes[0][1].text(i, v + 0.3, str(v), ha="center", fontsize=9)
axes[0][1].set_title("年龄段构成（现龄）", fontsize=10.5, fontweight="bold")
axes[0][1].set_ylim(0, 30)
axes[0][1].spines[["top", "right"]].set_visible(False)
# 收入层级
IL = {1: "学者/中产", 2: "十万至百万$", 3: "数百万至千万级", 4: "千万至亿$", 5: "亿美元以上"}
inc = {}
for e in EXPERTS:
    inc[e["incomeTier"]] = inc.get(e["incomeTier"], 0) + 1
labels_i = [f"T{i} {IL[i]}" for i in sorted(inc)]
axes[1][0].bar(range(len(inc)), [inc[i] for i in sorted(inc)], color=[S[3], S[0], S[1], S[4], S[6]], width=0.55)
for i, k in enumerate(sorted(inc)):
    axes[1][0].text(i, inc[k] + 0.3, str(inc[k]), ha="center", fontsize=9)
axes[1][0].set_xticks(range(len(inc))); axes[1][0].set_xticklabels(labels_i, fontsize=8)
axes[1][0].set_title("收入层级分布", fontsize=10.5, fontweight="bold")
axes[1][0].set_ylim(0, 16)
axes[1][0].spines[["top", "right"]].set_visible(False)
# 文化圈
rg = dist("region")
axes[1][1].bar(rg.keys(), rg.values(), color=S[7], width=0.45)
for i, k in enumerate(rg):
    axes[1][1].text(i, rg[k] + 0.3, str(rg[k]), ha="center", fontsize=9)
axes[1][1].set_title("文化圈构成", fontsize=10.5, fontweight="bold")
axes[1][1].set_ylim(0, 44)
axes[1][1].spines[["top", "right"]].set_visible(False)
fig.suptitle("图7  样本人口统计画像（N=43）", fontsize=11.5, fontweight="bold")
fig.tight_layout(rect=[0, 0, 1, 0.96])
save(fig, "fig7_demographics.png")

# ---------- 图8：学派分布 ----------
school_members = {sk: [e for e in EXPERTS if sk in e["schools"]] for sk in SCHOOLS}
order8 = sorted(SCHOOLS, key=lambda sk: -len(school_members[sk]))
labels8 = [SCHOOLS[sk] for sk in order8]
cnt8 = [len(school_members[sk]) for sk in order8]
fig, ax = plt.subplots(figsize=(9.2, 4.6))
ax.barh(range(len(order8)), cnt8, color=[S[i % 8] for i in range(len(order8))], height=0.6)
ax.set_yticks(range(len(order8))); ax.set_yticklabels(labels8, fontsize=9)
ax.invert_yaxis()
for i, c in enumerate(cnt8):
    ax.text(c + 0.3, i, str(c), va="center", fontsize=9)
ax.set_xlim(0, 26)
ax.set_xlabel("成员专家数（一位专家可属多学派）", fontsize=9)
ax.set_title("图8  七大学派成员分布", fontsize=11.5, fontweight="bold", pad=10)
ax.spines[["top", "right"]].set_visible(False)
ax.tick_params(axis="y", length=0)
ax.grid(axis="x", color="#e5e5e5", lw=0.6)
ax.set_axisbelow(True)
save(fig, "fig8_schools.png")

# ---------- 图9：反馈效度三档构成 ----------
tier_members = {"高效度": [], "中效度": [], "低效度": []}
for e in EXPERTS:
    tier_members[DOMAIN[e["id"]]["tier"]].append(e)
fig, ax = plt.subplots(figsize=(8.6, 4.6))
tiers = ["高效度", "中效度", "低效度"]
tv = [len(tier_members[t]) for t in tiers]
bars = ax.bar(tiers, tv, color=[TIER_COLOR[t] for t in tiers], width=0.5)
for i, t in enumerate(tiers):
    ax.text(i, tv[i] + 0.4, f"{tv[i]} 位\n{tv[i]/N*100:.0f}%", ha="center", fontsize=9.5)
    nvp = sum(len(e["viewpoints"]) for e in tier_members[t])
    ax.text(i, tv[i] / 2, f"观点 {nvp} 条", ha="center", va="center", fontsize=8.6, color="white", fontweight="bold")
ax.set_ylim(0, 28)
ax.set_ylabel("专家数", fontsize=9)
ax.set_title("图9  按反馈效度分档的样本构成（高效度=友好环境）", fontsize=11.5, fontweight="bold", pad=10)
ax.spines[["top", "right"]].set_visible(False)
ax.grid(axis="y", color="#e5e5e5", lw=0.6)
ax.set_axisbelow(True)
save(fig, "fig9_tiers.png")

# ---------- 图10：人均观点数（按领域簇） ----------
order10 = sorted(CLUSTER_ORDER, key=lambda cl: -sum(len(e["viewpoints"]) for e in cluster_members[cl]) / len(cluster_members[cl]))
labels10 = [f"{cl}（{len(cluster_members[cl])}人）" for cl in order10]
avg10 = [sum(len(e["viewpoints"]) for e in cluster_members[cl]) / len(cluster_members[cl]) for cl in order10]
fig, ax = plt.subplots(figsize=(9.6, 4.8))
ax.bar(range(len(order10)), avg10, color=[TIER_COLOR[cluster_tier[cl]] for cl in order10], width=0.58)
ax.set_xticks(range(len(order10))); ax.set_xticklabels(labels10, fontsize=8)
for i, v in enumerate(avg10):
    ax.text(i, v + 0.12, f"{v:.1f}", ha="center", fontsize=8.4)
ax.set_ylim(0, max(avg10) + 1.6)
ax.set_ylabel("人均观点条数", fontsize=9)
ax.set_title("图10  各领域簇人均观点条数（颜色=反馈效度档）", fontsize=11.5, fontweight="bold", pad=10)
ax.spines[["top", "right"]].set_visible(False)
ax.grid(axis="y", color="#e5e5e5", lw=0.6)
ax.set_axisbelow(True)
save(fig, "fig10_vp_per_cluster.png")

# ---------- 图11：节点共现 top10 ----------
labels11 = [f"{a}×{b}" for (a, b), _ in cooccur]
vals11 = [c for _, c in cooccur]
fig, ax = plt.subplots(figsize=(9.6, 4.8))
ax.barh(range(len(cooccur)), vals11, color=S[2], height=0.6)
ax.set_yticks(range(len(cooccur))); ax.set_yticklabels(labels11, fontsize=8.8)
ax.invert_yaxis()
for i, c in enumerate(vals11):
    ax.text(c + 0.2, i, f"{c} 位", va="center", fontsize=8.6)
ax.set_xlim(0, max(vals11) + 3)
ax.set_xlabel("同时命中两节点的专家数", fontsize=9)
ax.set_title("图11  能力节点共现 Top10（同一专家同时持有两节点）", fontsize=11.5, fontweight="bold", pad=10)
ax.spines[["top", "right"]].set_visible(False)
ax.tick_params(axis="y", length=0)
ax.grid(axis="x", color="#e5e5e5", lw=0.6)
ax.set_axisbelow(True)
save(fig, "fig11_cooccur.png")

# ---------- 控制台摘要（供报告引用） ----------
print("\n=== 摘要统计 ===")
print("每人观点数: min=%d max=%d mean=%.2f" % (min(len(e["viewpoints"]) for e in EXPERTS),
      max(len(e["viewpoints"]) for e in EXPERTS), TOTAL / N))
print("人均命中节点数: mean=%.2f" % (sum(sum(1 for k in CAT_KEYS if hit[e["id"]][k] > 0) for e in EXPERTS) / N))
print("AUTH:", AUTH_STATS)
print("tiers:", {t: len(tier_members[t]) for t in tiers})
for cl in CLUSTER_ORDER:
    vps = sum(len(e["viewpoints"]) for e in cluster_members[cl])
    print(f"  {cl}: {len(cluster_members[cl])}人 {vps}条 avg={vps/len(cluster_members[cl]):.1f}")
print("cooccur top:", [(f"{a}-{b}", c) for (a, b), c in cooccur])
print("practice vs knowledge 最大差异:", [(k, ptype_hit[k]) for k, _, _, _ in rows6[:5]])
