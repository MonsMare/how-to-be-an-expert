# -*- coding: utf-8 -*-
"""校验:图片引用完整性 + 一万小时声明 + 报告结构"""
import json, os, re, io, sys

base = os.path.join(os.path.dirname(__file__), "..")
out = io.StringIO()
def p(*a): print(*a, file=out)

# 1. 图片引用检查
md = open(os.path.join(base, "report", "实验汇报书.md"), encoding="utf8").read()
refs = re.findall(r"!\[([^\]]*)\]\(([^)]+)\)", md)
p("== 图片引用 ==")
for alt, path in refs:
    fp = os.path.join(base, "report", path.replace("/", os.sep))
    p("%s -> %s : %s" % (alt, path, "OK" if os.path.exists(fp) else "MISSING!"))

# 2. 一万小时声明检查
D = json.load(open(os.path.join(base, "report", "data_export.json"), encoding="utf8"))
p("\n== '一万小时'相关观点 ==")
for e in D["experts"]:
    for v in e["viewpoints"]:
        if "一万小时" in v["t"]:
            p("%s | %s | %s" % (e["nameZh"], v["t"], v["auth"]))

# 3. 章节结构
p("\n== 章节结构 ==")
for line in md.splitlines():
    if re.match(r"^#{1,3} ", line):
        p(line)

# 4. 数字抽查(报告出现的 vs 数据)
p("\n== 关键数字抽查 ==")
checks = [
    ("30/43", "C2 共识度"), ("28/43", "C1/C15 共识度"), ("27/43", "C16 共识度"),
    ("24 | 56%", "C7 共识度(表1格式)"), ("4/43", "C17 共识度"), ("281", "亲历"), ("20", "借鉴"), ("2", "共识"),
    ("303", "观点总数"), ("7.05", "人均观点"), ("6.95", "人均命中节点"),
    ("33", "男性"), ("10", "女性"), ("527", "全节点观点合计"),
]
for num, desc in checks:
    p("%s(%s): %s" % (num, desc, "OK" if num in md else "MISSING"))

sys.stdout.buffer.write(out.getvalue().encode("utf-8"))
