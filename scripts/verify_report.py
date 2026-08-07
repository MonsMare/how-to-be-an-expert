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
    ("42/58", "C2 共识度"), ("41/58", "C1 共识度"), ("39/58", "C16 共识度"),
    ("38 | 66%", "C15 共识度(表1格式)"), ("35 | 60%", "C7 共识度(表1格式)"), ("5 | 9%", "C17 共识度(表1格式)"),
    ("379", "亲历"), ("401 条观点", "观点总数"), ("6.91", "人均观点"), ("7.45", "人均命中节点"),
    ("男 47", "男性"), ("女 11", "女性"), ("723", "全节点观点合计"), ("58 位", "样本总数"),
]
for num, desc in checks:
    p("%s(%s): %s" % (num, desc, "OK" if num in md else "MISSING"))

sys.stdout.buffer.write(out.getvalue().encode("utf-8"))
