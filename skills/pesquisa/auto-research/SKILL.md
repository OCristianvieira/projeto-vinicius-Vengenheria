# Skill: AutoResearch

## Quando usar
Quando o usuário diz `/auto-research`, "quero fazer o research do [cliente]", "analisar resultados da semana [X]", ou "melhorar o instalador com base nos dados".

## O que é
Loop de melhoria contínua dos instaladores, inspirado no autoresearch do Karpathy. Analisa os dados de performance dos posts publicados e atualiza o instalador do cliente com insights baseados em dados reais — exemplos confirmados, padrões validados, hipóteses descartadas.

Os instaladores são o arquivo que evolui. As skills apenas orquestram o uso deles.

---

## Fluxo

### Passo 1 — Identificar cliente e semana

Perguntar ao usuário:
- Qual cliente? (`powerd`, `fernando-maeda`, `salva-tributo`, `sim-carreira`)
- Qual semana foi publicada? (ex: semana 16)
- Os dados já estão no TSV ou o usuário vai colar agora?

### Passo 2 — Coletar métricas (se não estiverem no TSV)

Pedir ao usuário que cole os dados no formato:

```
Post | Dia | Hook (primeiras palavras) | Tipo de Hook | Impressões | Likes | Comentários
```

Exemplo:
```
Post 1 | Seg | "Como eu criei uma página de vendas..." | how-to | 4.200 | 87 | 12
Post 2 | Ter | "Fui demitido e 3 meses depois..." | story | 8.100 | 203 | 31
Post 3 | Qua | "5 prompts que uso toda semana" | lista | 1.900 | 44 | 6
```

Os tipos de hook disponíveis são:
- `contrarian` — opinião que vai contra o senso comum
- `story` — narrativa pessoal com arco
- `transformacao` — antes/depois com números (melhor performer histórico)
- `lista` — formato numerado
- `how-to` — passo a passo
- `reveal` — revelação, "o que ninguém fala sobre X"
- `provocacao` — pergunta ou provocação direta

### Passo 3 — Registrar no TSV

Adicionar as linhas ao arquivo `performance/[cliente].tsv` no repo `styem-autoresearch` (local: clonar se necessário, ou editar diretamente via gh).

Formato de cada linha (tab-separated):
```
semana	data	plataforma	tipo_hook	formato	angulo	impressoes	likes	comentarios	compartilhamentos	taxa_eng	status	notas
```

Calcular `taxa_eng` = (likes + comentarios + compartilhamentos) / impressoes * 100, formatar como `X.X%`.

`status`: `keep` se impressões acima da média da semana, `discard` se abaixo.

### Passo 4 — Executar a análise

Ler:
1. O `program.md` do repo `styem-autoresearch` — é a instrução mestre
2. O TSV completo do cliente — histórico de resultados
3. O instalador atual do cliente em `clientes/ativos/[cliente]/instaladores/instalador_linkedin.md`

Seguir o loop definido no `program.md`:
- Identificar top 3 e bottom 3
- Cruzar com tipo_hook, formato, ângulo
- Formular hipótese com número ("hooks de transformação têm 2.3x mais reach")
- Propor mudança concreta no instalador

### Passo 5 — Apresentar mudanças para aprovação

Antes de aplicar, mostrar ao usuário:

```
## Análise — [cliente] — semana [X]

**Top performers:**
1. [hook] — [X] impressões — tipo: [X]
2. ...

**Underperformers:**
1. [hook] — [X] impressões — tipo: [X]

**Padrão identificado:**
[Descrição com números]

**Mudança proposta no instalador:**
Seção: [nome da seção]
Mudança: [o que vai mudar]

Confirmar? (s/n)
```

### Passo 6 — Aplicar mudança no instalador

Após aprovação:
1. Editar `clientes/ativos/[cliente]/instaladores/instalador_linkedin.md` com a mudança
2. Adicionar seção no topo do instalador (logo após o frontmatter/título):

```markdown
## Hipóteses Ativas — AutoResearch

| Semana | Hipótese | Status |
|---|---|---|
| s[X] | [hipótese aplicada] | 🔬 testando |
| s[X-1] | [hipótese anterior] | ✅ confirmada / ❌ descartada |
```

3. Se hipótese anterior foi confirmada: mover o exemplo/regra para o corpo permanente do instalador
4. Se descartada: adicionar à seção de anti-padrões

### Passo 7 — Commit no repo styem-autoresearch

```bash
cd styem-autoresearch
git checkout -b autoresearch/[cliente]-s[semana]
git add performance/[cliente].tsv instaladores/[cliente]/instalador_linkedin.md
git commit -m "research([cliente]): s[semana] — [hipótese testada em uma linha]"
git push origin autoresearch/[cliente]-s[semana]
```

Abrir PR para revisão de Cristian.

---

## Paths de referência

| Cliente | Instalador (fonte de verdade) | TSV |
|---|---|---|
| cristian | `clientes/ativos/cristian/instaladores/instalador_linkedin.md` | `styem-autoresearch/performance/powerd.tsv` |
| fernando-maeda | `linkedin-leadgen/ativos/fernando_maeda/instaladores/instalador_linkedin.md` | `styem-autoresearch/performance/fernando-maeda.tsv` |
| salva-tributo | `linkedin-leadgen/ativos/tiago_salva_tributo/instaladores/instalador_linkedin.md` | `styem-autoresearch/performance/salva-tributo.tsv` |
| sim-carreira | `linkedin-leadgen/ativos/thiago_sim_carreira/instaladores/instalador_linkedin_thiago.md` | `styem-autoresearch/performance/sim-carreira.tsv` |

**Repo styem-autoresearch:** https://github.com/OCristianvieira/styem-autoresearch

---

## Regras

- Nunca modificar tom de voz core, identidade visual, informações de produto
- Sempre apresentar mudança para aprovação antes de aplicar
- Uma hipótese por ciclo — não mudar 3 coisas ao mesmo tempo (você não saberá o que funcionou)
- Manter histórico no TSV — nunca apagar linhas antigas
- O `program.md` no repo é a fonte de verdade das instruções — se houver conflito, ele ganha
