# DNA Geracional & Mapeamento Comportamental Integrado

Diagnóstico de inteligência comportamental aplicada — cruza a bagagem sociohistórica do indivíduo (geração dominante) com psicometria madura (Sabotadores, Âncoras de Carreira de Schein e Estilo de Liderança).

Projeto irmão do [assessment-lideranca](https://github.com/sergiolbsm-coder/assessment-lideranca) (Instituto da Liderança), publicado à parte por ter ciclo de desenvolvimento próprio.

## Link

| | URL |
|---|---|
| 🧬 Diagnóstico | https://sergiolbsm-coder.github.io/dna-geracional/ |

## Como funciona

1. **Cadastro** — nome, e-mail, empresa, turma e fase.
2. **18 cenários de escolha forçada**, em 3 blocos:
   - **Bloco 1 — Motivação & Carreira**: pontua geração dominante (Baby Boomer / Geração X / Geração Y / Geração Z).
   - **Bloco 2 — Estresse & Sabotadores**: pontua geração + Sabotador dominante (Controlador, Cético-Hiper-Realizador, Pleaser-Inquieto, Inquieto-Ansioso).
   - **Bloco 3 — Âncoras de Carreira (Schein)**: pontua Âncora dominante (Autonomia/Independência, Competência Gerencial Geral, Segurança/Estabilidade, Dedicação a uma Causa).
3. **Relatório instantâneo**, calculado no navegador (sem depender de IA para pontuar):
   - Dashboard de influência geracional (%)
   - Matriz psicométrica integrada (Âncora × Sabotador × Estilo de Liderança × Causa/Propósito)
   - Guia para o gestor (como delegar, gatilho de engajamento, ponto cego)
   - Plano de Desenvolvimento Individual (PDI)

## Backend

Este diagnóstico **usa o mesmo Google Apps Script / planilha** do [assessment-lideranca](https://github.com/sergiolbsm-coder/assessment-lideranca) — o `APPS_SCRIPT.gs` daquele repositório já inclui as colunas `gen_boomer`, `gen_x`, `gen_y`, `gen_z`, `gen_dominante`, `sabotador_dominante`, `ancora_schein`, `ancora_secundaria`, `estilo_lideranca` e `causa_proposito` na aba `Respostas`.

Não há backend próprio neste repositório — é uma página estática (`index.html`) que salva via `fetch` no mesmo endpoint compartilhado.

## Deploy

Site estático puro — GitHub Pages publicado a partir da branch `main`, raiz do repositório (`index.html` + `.nojekyll`). Qualquer push em `main` atualiza o site em alguns minutos.

---
*Instituto da Liderança · CNPJ 22.233.124/0001-50*
