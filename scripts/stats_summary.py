# -*- coding: utf-8 -*-
"""输出报告所需的全部描述统计（UTF-8 写入文件，避免终端编码问题）"""
import json, os, io, sys

D = json.load(open(os.path.join(os.path.dirname(__file__), "..", "report", "data_export.json"), encoding="utf8"))
EXPERTS = D["experts"]; CAT = D["CAT"]; CAT_STATS = D["CAT_STATS"]; AUTH_STATS = D["AUTH_STATS"]
SCHOOLS = D["SCHOOLS"]; DOMAIN = D["DOMAIN"]; CLUSTER_ORDER = D["CLUSTER_ORDER"]
N = D["meta"]["nExperts"]; TOTAL = D["meta"]["totalViewpoints"]
CAT_KEYS = list(CAT.keys())

out = io.StringIO()
def p(*a):
    print(*a, file=out)

p("N=%d TOTAL=%d" % (N, TOTAL))
p("每人观点数 min=%d max=%d mean=%.2f" % (min(len(e['viewpoints']) for e in EXPERTS),
  max(len(e['viewpoints']) for e in EXPERTS), TOTAL / N))
hit = {e["id"]: {k: sum(1 for v in e["viewpoints"] if k in v["c"]) for k in CAT_KEYS} for e in EXPERTS}
p("人均命中节点数 mean=%.2f" % (sum(sum(1 for k in CAT_KEYS if hit[e['id']][k] > 0) for e in EXPERTS) / N))

p("\n== 节点共识度(降序) ==")
for k in sorted(CAT_KEYS, key=lambda k: -CAT_STATS[k]["count"]):
    p("%s %s: %d (%.0f%%)" % (k, CAT[k], CAT_STATS[k]["count"], CAT_STATS[k]["count"] / N * 100))

p("\n== 真实性 ==")
p(AUTH_STATS)

p("\n== 性别 ==")
g = {}
for e in EXPERTS: g[e["gender"]] = g.get(e["gender"], 0) + 1
p(g)

p("\n== 年龄段 ==")
ab = {}
for e in EXPERTS: ab[e["ageBracket"]] = ab.get(e["ageBracket"], 0) + 1
p(ab)

p("\n== 收入层级 ==")
IL = {1: "学者/中产", 2: "十万至百万$", 3: "数百万至千万级", 4: "千万至亿$", 5: "亿美元以上"}
inc = {}
for e in EXPERTS: inc[IL[e["incomeTier"]]] = inc.get(IL[e["incomeTier"]], 0) + 1
p(inc)

p("\n== 文化圈 ==")
rg = {}
for e in EXPERTS: rg[e["region"]] = rg.get(e["region"], 0) + 1
p(rg)

p("\n== 领域 ==")
fd = {}
for e in EXPERTS: fd[e["field"]] = fd.get(e["field"], 0) + 1
for k, v in sorted(fd.items(), key=lambda x: -x[1]):
    p("%s: %d" % (k, v))

p("\n== 学派 ==")
for sk in SCHOOLS:
    n = sum(1 for e in EXPERTS if sk in e["schools"])
    p("%s: %d" % (SCHOOLS[sk], n))

p("\n== 效度档 ==")
tm = {"高效度": 0, "中效度": 0, "低效度": 0}
tvp = {"高效度": 0, "中效度": 0, "低效度": 0}
for e in EXPERTS:
    t = DOMAIN[e["id"]]["tier"]
    tm[t] += 1; tvp[t] += len(e["viewpoints"])
for t in tm:
    p("%s: %d人 %d条" % (t, tm[t], tvp[t]))

p("\n== 簇 ==")
for cl in CLUSTER_ORDER:
    m = [e for e in EXPERTS if DOMAIN[e["id"]]["cluster"] == cl]
    vps = sum(len(e["viewpoints"]) for e in m)
    p("%s(%s): %d人 %d条 avg=%.1f" % (cl, DOMAIN[m[0]["id"]]["tier"], len(m), vps, vps / len(m)))

p("\n== 实践型/知识型 ==")
practice_ids = {"waitzkin","leonard","kasparov","kobe","serena","federer","rams","adria","torvalds","musashi","goggins","biles"}
pN = len(practice_ids); kN = N - pN
p("实践型 %d 知识型 %d" % (pN, kN))
for k in CAT_KEYS:
    pr = sum(1 for e in EXPERTS if e["id"] in practice_ids and hit[e["id"]][k] > 0)
    kr = sum(1 for e in EXPERTS if e["id"] not in practice_ids and hit[e["id"]][k] > 0)
    p("%s %s: 实践 %d/%.0f%% 知识 %d/%.0f%% diff=%.0f" % (k, CAT[k].split('（')[0], pr, pr / pN * 100, kr, kr / kN * 100, abs(pr / pN - kr / kN) * 100))

p("\n== 共现 top10 ==")
co = {}
for a in range(len(CAT_KEYS)):
    for b in range(a + 1, len(CAT_KEYS)):
        ka, kb = CAT_KEYS[a], CAT_KEYS[b]
        c = sum(1 for e in EXPERTS if hit[e["id"]][ka] > 0 and hit[e["id"]][kb] > 0)
        if c >= 8:
            co[(ka, kb)] = c
for (a, b), c in sorted(co.items(), key=lambda x: -x[1])[:12]:
    p("%s×%s: %d" % (a, b, c))

p("\n== 每个节点的观点条数(去重前) ==")
vp_by_cat = {k: sum(1 for e in EXPERTS for v in e["viewpoints"] if k in v["c"]) for k in CAT_KEYS}
for k in sorted(CAT_KEYS, key=lambda k: -vp_by_cat[k]):
    p("%s %s: %d条" % (k, CAT[k], vp_by_cat[k]))

p("\n== 各专家清单 ==")
for e in EXPERTS:
    t = DOMAIN[e["id"]]["tier"]
    p("%s | %s | %s | %s | %d条 | %s | 学派:%s" % (e["nameZh"], e["field"], e["gender"], e["ageBracket"],
      len(e["viewpoints"]), t, ",".join(e["schools"])))

sys.stdout.buffer.write(out.getvalue().encode("utf-8"))
