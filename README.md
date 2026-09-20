# How to Be an Expert

[中文 README](README.zh-CN.md)

A reproducible meta-learning research project studying a deceptively simple question:

> **Are there recurring patterns in how people become experts across very different fields?**

The project analyses **58 experts across 8 broad domains**, using **401 public statements** coded into a **17-node capability framework**.

Rather than collecting advice as anecdotes, the goal is to turn expert statements into a structured dataset that can be compared, challenged, and reproduced.

## Research Design

The project follows a four-stage pipeline:

```text
Collect
  → classify
  → quantify
  → interpret
```

Outputs include:

- source files for 58 experts
- a structured multi-dimensional Wiki
- a 17-node coding framework
- reproducible statistics
- 11 generated visualisations
- a full research report and discussion of limitations

All analytical outputs are generated from the project data and can be reproduced locally.

## Dataset

| Dimension | Scope |
|---|---|
| Experts | 58 |
| Public statements | 401 |
| Broad domains | 8 |
| Domain clusters | 11 |
| Capability nodes | 17 |
| Generated figures | 11 |
| Experience-grounded statements | 379 / 401 (94.5%) |

## Main Findings

### 1. A cross-domain capability backbone appears in the sample

The most frequently observed nodes were:

- long-term accumulation — 42 / 58
- deliberate practice — 41 / 58
- externalising knowledge / teaching / honest feedback — 39 / 58
- process orientation — 38 / 58

### 2. Consensus is largely grounded in lived experience

**379 of 401 statements (94.5%)** were coded as experience-grounded rather than second-hand advice.

### 3. Strategy usefulness depends on the feedback structure of the domain

The sample shows a substantial gap in deliberate-practice prevalence between practice-heavy and knowledge-heavy domains.

This led to a more important conclusion than any single ranking:

> **Diagnose the feedback environment before prescribing the learning strategy.**

### 4. Process orientation behaves like a hub

Process orientation frequently co-occurs with long-term accumulation and deliberate practice, suggesting that it may act as an enabling condition rather than an isolated tactic.

## Analytical Framework

The 17-node framework covers themes including deliberate practice, long-term accumulation, feedback loops, deep focus, mentors and systems, mental models, resilience, direction selection, specific knowledge, continuous learning, cross-domain transfer, intrinsic motivation, leverage, process orientation, teaching/externalisation, and environmental conditions.

The framework is an analytical instrument, not a claim that expertise can be reduced to universal rules.

## Reproducibility

```bash
node scripts/export_data.js
python3 scripts/gen_report_figures.py
python3 scripts/verify_report.py
node gen_wiki.js && node gen_analysis.js && node gen_landing.js
```

## Repository Map

```text
experts/        source-oriented expert notes
wiki/           multi-dimensional browsing layer
analysis/       quantitative analysis views
report/         research report and figures
scripts/        reproducible analysis and verification
index.html      static project entry point
```

## Methodological Limits

This is exploratory research, not a causal study.

Important limitations include survivorship and selection bias, unequal representation across groups and domains, dependence on public statements, manual coding bias, retrospective self-report, and overlap between capability nodes.

The results should be read as a **map of recurring patterns**, not a universal recipe for success.

## Why I Built This

I wanted to test whether a large body of qualitative, cross-domain material could be turned into a transparent workflow that combines:

**source collection → coding → quantitative comparison → interpretation → reproducibility**

That research method is the main reason this project belongs in my portfolio.

---

**Research focus:** Meta-learning · Research Methodology · Qualitative Coding · Reproducible Analysis
