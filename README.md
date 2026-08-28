# DNA Geracional & Mapeamento Comportamental Integrado

Diagnóstico de inteligência comportamental aplicada — cruza a bagagem sociohistórica do indivíduo (geração dominante) com psicometria madura (Sabotadores, Âncoras de Carreira de Schein e Estilo de Liderança).

Projeto irmão do [assessment-lideranca](https://github.com/sergiolbsm-coder/assessment-lideranca) (Instituto da Liderança), publicado à parte por ter ciclo de desenvolvimento e planilha próprios.

## Link

| | URL |
|---|---|
| 🧬 Diagnóstico | https://sergiolbsm-coder.github.io/dna-geracional/ |
| 🔧 Admin | https://sergiolbsm-coder.github.io/dna-geracional/admin.html |

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

Backend próprio e independente do `assessment-lideranca` — planilha Google Sheets dedicada + `APPS_SCRIPT.gs` (neste repositório) publicado como Web App.

- **Planilha**: https://docs.google.com/spreadsheets/d/14cXiQPBxMfG3f2HIVS-qgH7TpN99nMY8MMzi5Oo3r18/edit
- **Aba `Respostas`**: `timestamp`, `nome`, `email`, `empresa`, `turma`, `fase`, `gen_boomer`, `gen_x`, `gen_y`, `gen_z`, `gen_dominante`, `sabotador_dominante`, `ancora_schein`, `ancora_secundaria`, `estilo_lideranca`, `causa_proposito`
- **Aba `Turmas`**: fonte de verdade do dropdown "Turma" no cadastro

### Configurar o backend (uma vez)

1. Abra a planilha acima → **Extensões → Apps Script**.
2. Apague o conteúdo padrão de `Code.gs` e cole o conteúdo de [`APPS_SCRIPT.gs`](APPS_SCRIPT.gs) deste repositório.
3. Salve (ícone de disquete).
4. **Implantar → Nova implantação → tipo "App da Web"**:
   - Executar como: **Eu (sua conta)**
   - Quem tem acesso: **Qualquer pessoa**
5. Autorize as permissões pedidas pelo Google (é a sua própria conta autorizando o script).
6. Copie a **URL do app da Web** (termina em `/exec`) e cole em `SHEETS_URL` no topo do `<script>` de [`index.html`](index.html).
7. (Opcional) No editor do Apps Script, rode a função `testarInsercao()` uma vez para confirmar que a aba `Respostas` é criada com o cabeçalho correto.
8. Cole a mesma URL em `SHEETS_URL` no topo do `<script>` de [`admin.html`](admin.html).

## Admin

[`admin.html`](admin.html) lista todo mundo que respondeu (nome, e-mail, turma, geração dominante, sabotador), com busca, filtro por turma, exportação em CSV e relatório individual completo (com botão de baixar PDF), reaproveitando o mesmo motor de relatório do `index.html`.

- **Acesso**: protegido por uma senha simples definida no primeiro acesso, guardada no `localStorage` do navegador. Não é criptografia forte — apenas evita que qualquer pessoa com o link veja os dados de quem respondeu. Esqueceu a senha? Tem um link "Esqueci a senha" na tela de login que reseta (só nesse navegador).
- **Onde os dados vêm**: mesmo backend do `index.html` (`SHEETS_URL`) — sempre reflete a planilha em tempo real.

## Deploy

Site estático puro — GitHub Pages publicado a partir da branch `main`, raiz do repositório (`index.html` + `.nojekyll`). Qualquer push em `main` atualiza o site em alguns minutos.

---
*Instituto da Liderança · CNPJ 22.233.124/0001-50*
