# -*- coding: utf-8 -*-
"""校验报告中关键声明的数据准确性"""
import json, os, io, sys

D = json.load(open(os.path.join(os.path.dirname(__file__), "..", "report", "data_export.json"), encoding="utf8"))
EXPERTS = D["experts"]; CAT = D["CAT"]; CLUSTER_ORDER = D["CLUSTER_ORDER"]; DOMAIN = D["DOMAIN"]
CAT_KEYS = list(CAT.keys())
out = io.StringIO()
def p(*a): print(*a, file=out)

hit = {e["id"]: {k: sum(1 for v in e["viewpoints"] if k in v["c"]) for k in CAT_KEYS} for e in EXPERTS}
nhit = {e["id"]: sum(1 for k in CAT_KEYS if hit[e["id"]][k] > 0) for e in EXPERTS}
p("每位专家命中节点数: min=%d max=%d" % (min(nhit.values()), max(nhit.values())))
p("命中节点数分布: " + str(sorted(nhit.values())))

# 全节点观点合计
vp_by_cat = {k: sum(1 for e in EXPERTS for v in e["viewpoints"] if k in v["c"]) for k in CAT_KEYS}
p("全节点观点合计: %d" % sum(vp_by_cat.values()))

# 各节点亲历占比
auth_by_cat = {k: {"亲历": 0, "借鉴": 0, "共识": 0} for k in CAT_KEYS}
for e in EXPERTS:
    for v in e["viewpoints"]:
        for k in v["c"]:
            auth_by_cat[k][v["auth"]] += 1
p("各节点亲历占比(降序):")
for k in sorted(CAT_KEYS, key=lambda k: -auth_by_cat[k]["亲历"] / sum(auth_by_cat[k].values())):
    t = sum(auth_by_cat[k].values())
    p("  %s: 亲历%d/%.0f%% 借鉴%d 共识%d" % (k, auth_by_cat[k]["亲历"], auth_by_cat[k]["亲历"] / t * 100,
      auth_by_cat[k]["借鉴"], auth_by_cat[k]["共识"]))

# 每簇命中节点数范围
p("各簇成员命中节点数范围:")
for cl in CLUSTER_ORDER:
    m = [e for e in EXPERTS if DOMAIN[e["id"]]["cluster"] == cl]
    vals = sorted(nhit[e["id"]] for e in m)
    p("  %s: %s" % (cl, vals))

# 实践/知识型样本构成复核
practice_ids = {"waitzkin","leonard","kasparov","kobe","serena","federer","rams","adria","torvalds","musashi","goggins","biles"}
p("实践型成员: %s" % sorted(practice_ids))
p("知识型人数: %d" % (len(EXPERTS) - len(practice_ids)))

sys.stdout.buffer.write(out.getvalue().encode("utf-8"))
