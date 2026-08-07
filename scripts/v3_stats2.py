# -*- coding: utf-8 -*-
"""v3 报告补充数据：节点借鉴分布、命中范围"""
import json, os, io, sys

D = json.load(open(os.path.join(os.path.dirname(__file__), "..", "report", "data_export.json"), encoding="utf8"))
EXPERTS = D["experts"]; CAT = D["CAT"]; CAT_KEYS = list(CAT.keys())
out = io.StringIO()
def p(*a): print(*a, file=out)

hit = {e["id"]: {k: sum(1 for v in e["viewpoints"] if k in v["c"]) for k in CAT_KEYS} for e in EXPERTS}
nhit = {e["id"]: sum(1 for k in CAT_KEYS if hit[e["id"]][k] > 0) for e in EXPERTS}
p("命中节点 min=%d max=%d" % (min(nhit.values()), max(nhit.values())))

auth_by_cat = {k: {"亲历": 0, "借鉴": 0, "共识": 0} for k in CAT_KEYS}
for e in EXPERTS:
    for v in e["viewpoints"]:
        for k in v["c"]:
            auth_by_cat[k][v["auth"]] += 1
p("各节点借鉴条数与占比:")
for k in sorted(CAT_KEYS, key=lambda k: -auth_by_cat[k]["借鉴"]):
    t = sum(auth_by_cat[k].values())
    if auth_by_cat[k]["借鉴"] > 0:
        p("  %s: 借鉴%d/%d = %.0f%%" % (k, auth_by_cat[k]["借鉴"], t, auth_by_cat[k]["借鉴"] / t * 100))

p("共识条数分布: " + str({k: auth_by_cat[k]["共识"] for k in CAT_KEYS if auth_by_cat[k]["共识"] > 0}))
p("各节点亲历占比(最低3个):")
rows = sorted(CAT_KEYS, key=lambda k: auth_by_cat[k]["亲历"] / sum(auth_by_cat[k].values()))
for k in rows[:3]:
    t = sum(auth_by_cat[k].values())
    p("  %s: 亲历%d/%d = %.0f%%" % (k, auth_by_cat[k]["亲历"], t, auth_by_cat[k]["亲历"] / t * 100))

sys.stdout.buffer.write(out.getvalue().encode("utf-8"))
