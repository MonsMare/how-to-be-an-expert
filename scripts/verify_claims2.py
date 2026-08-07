# -*- coding: utf-8 -*-
"""验证报告 4.5/4.8/5.2 节的具体数字声明"""
import json, os, io, sys

D = json.load(open(os.path.join(os.path.dirname(__file__), "..", "report", "data_export.json"), encoding="utf8"))
EXPERTS = D["experts"]; CAT = D["CAT"]; DOMAIN = D["DOMAIN"]; CLUSTER_ORDER = D["CLUSTER_ORDER"]
CAT_KEYS = list(CAT.keys())
out = io.StringIO()
def p(*a): print(*a, file=out)

hit = {e["id"]: {k: sum(1 for v in e["viewpoints"] if k in v["c"]) for k in CAT_KEYS} for e in EXPERTS}

# Kahneman 画像
p("== Kahneman 节点分布 ==")
for k in CAT_KEYS:
    if hit["kahneman"][k] > 0:
        p("  %s %s: %d条" % (k, CAT[k], hit["kahneman"][k]))

# Goggins 画像
p("== Goggins 节点分布 ==")
for k in CAT_KEYS:
    if hit["goggins"][k] > 0:
        p("  %s %s: %d条" % (k, CAT[k], hit["goggins"][k]))

# 簇命中率验证
p("\n== 簇命中率验证 ==")
def cl_rate(cl, ks):
    m = [e for e in EXPERTS if DOMAIN[e["id"]]["cluster"] == cl]
    for k in ks:
        n = sum(1 for e in m if hit[e["id"]][k] > 0)
        p("  %s %s: %d/%d = %.0f%%" % (cl, k, n, len(m), n / len(m) * 100))

cl_rate("竞技与认知竞技", ["C1", "C15", "C2"])
cl_rate("工艺创造", ["C16", "C9"])
cl_rate("科研探索", ["C2", "C7", "C16", "C1"])
cl_rate("写作传播", ["C16", "C15", "C7", "C1"])
cl_rate("投资预测", ["C9", "C14", "C1"])
cl_rate("表演艺术", ["C1", "C15", "C16"])

# 低效度簇在 C1 vs C9/C16/C7 的对比(5.2 声明)
p("\n== 低效度三簇 C1 vs C9/C16/C7 对比 ==")
for cl in ["科研探索", "写作传播", "投资预测"]:
    m = [e for e in EXPERTS if DOMAIN[e["id"]]["cluster"] == cl]
    row = {k: sum(1 for e in m if hit[e["id"]][k] > 0) / len(m) * 100 for k in ["C1", "C9", "C16", "C7"]}
    p("  %s: C1=%.0f%% C9=%.0f%% C16=%.0f%% C7=%.0f%%" % (cl, row["C1"], row["C9"], row["C16"], row["C7"]))

sys.stdout.buffer.write(out.getvalue().encode("utf-8"))
