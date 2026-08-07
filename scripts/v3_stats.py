# -*- coding: utf-8 -*-
"""v3 报告更新数据：各簇命中率 + 报告需要的精确数字"""
import json, os, io, sys

D = json.load(open(os.path.join(os.path.dirname(__file__), "..", "report", "data_export.json"), encoding="utf8"))
EXPERTS = D["experts"]; CAT = D["CAT"]; DOMAIN = D["DOMAIN"]; CLUSTER_ORDER = D["CLUSTER_ORDER"]
CAT_KEYS = list(CAT.keys()); N = D["meta"]["nExperts"]; TOTAL = D["meta"]["totalViewpoints"]
out = io.StringIO()
def p(*a): print(*a, file=out)

hit = {e["id"]: {k: sum(1 for v in e["viewpoints"] if k in v["c"]) for k in CAT_KEYS} for e in EXPERTS}

p("N=%d TOTAL=%d" % (N, TOTAL))
p("每人观点 min=%d max=%d mean=%.2f" % (min(len(e['viewpoints']) for e in EXPERTS), max(len(e['viewpoints']) for e in EXPERTS), TOTAL / N))
p("人均命中节点 mean=%.2f" % (sum(sum(1 for k in CAT_KEYS if hit[e['id']][k] > 0) for e in EXPERTS) / N))

p("\n== 4.4 节点观点条数(去重前) ==")
vp_by_cat = {k: sum(1 for e in EXPERTS for v in e["viewpoints"] if k in v["c"]) for k in CAT_KEYS}
for k in sorted(CAT_KEYS, key=lambda k: -vp_by_cat[k]):
    p("%s %s: %d条" % (k, CAT[k], vp_by_cat[k]))
p("全节点合计: %d" % sum(vp_by_cat.values()))

p("\n== 4.8 各簇命中率 ==")
for cl in CLUSTER_ORDER:
    m = [e for e in EXPERTS if DOMAIN[e["id"]]["cluster"] == cl]
    t = DOMAIN[m[0]["id"]]["tier"]
    top = sorted(CAT_KEYS, key=lambda k: -sum(1 for e in m if hit[e["id"]][k] > 0) / len(m))
    row = ", ".join("%s=%.0f%%" % (k, sum(1 for e in m if hit[e["id"]][k] > 0) / len(m) * 100) for k in top[:4])
    p("%s(%s,%d人): %s" % (cl, t, len(m), row))

p("\n== 4.7 实践/知识型 top5 ==")
practice_ids = {"waitzkin","leonard","kasparov","kobe","serena","federer","rams","adria","torvalds","musashi","goggins","biles"}
pN = len(practice_ids); kN = N - pN
rows = []
for k in CAT_KEYS:
    pr = sum(1 for e in EXPERTS if e["id"] in practice_ids and hit[e["id"]][k] > 0)
    kr = sum(1 for e in EXPERTS if e["id"] not in practice_ids and hit[e["id"]][k] > 0)
    rows.append((k, pr / pN * 100, kr / kN * 100, abs(pr / pN - kr / kN)))
for k, pp, kp, d in sorted(rows, key=lambda x: -x[3])[:6]:
    p("%s: 实践%.0f%% 知识%.0f%% diff=%.0f" % (k, pp, kp, d))

p("\n== 4.10 共现 top12 ==")
co = {}
for a in range(len(CAT_KEYS)):
    for b in range(a + 1, len(CAT_KEYS)):
        ka, kb = CAT_KEYS[a], CAT_KEYS[b]
        c = sum(1 for e in EXPERTS if hit[e["id"]][ka] > 0 and hit[e["id"]][kb] > 0)
        if c >= 10:
            co[(ka, kb)] = c
for (a, b), c in sorted(co.items(), key=lambda x: -x[1])[:12]:
    p("%s×%s: %d" % (a, b, c))

p("\n== C15 在 top10 出现次数 ==")
top10 = sorted(co.items(), key=lambda x: -x[1])[:10]
p(sum(1 for (a, b), _ in top10 if "C15" in (a, b)))

p("\n== 各节点共识度 ==")
for k in sorted(CAT_KEYS, key=lambda k: -D["CAT_STATS"][k]["count"]):
    p("%s %s: %d (%.0f%%)" % (k, CAT[k], D["CAT_STATS"][k]["count"], D["CAT_STATS"][k]["count"] / N * 100))

p("\n== 国别分布 ==")
cb = {}
cw = {}
for e in EXPERTS:
    cb[e["countryBirth"]] = cb.get(e["countryBirth"], 0) + 1
    cw[e["countryWork"]] = cw.get(e["countryWork"], 0) + 1
p("出生国: " + str(cb))
p("执业国: " + str(cw))

sys.stdout.buffer.write(out.getvalue().encode("utf-8"))
