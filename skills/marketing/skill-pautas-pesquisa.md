---
name: pautas-pesquisa-generico
description: >
  Pesquisa e mapa de pautas para criador de conteúdo — scraping de redes sociais, tendências, concorrentes e fontes externas.
  Use quando o usuário pedir pré-briefing, mapa de pautas, ideias da semana, pesquisa de tendências,
  "o que está bombando", análise de concorrente ou relatório semanal de inteligência de conteúdo.
  Preencher os placeholders antes de usar.
---

# Skill: Pautas e Pesquisa de Conteúdo — [CLIENTE]

> **Como usar esta skill:**
> Substitua todos os campos marcados com `[PLACEHOLDER]` pelos dados reais do cliente
> antes de ativar. Os placeholders estão marcados com colchetes e letras maiúsculas.

---

## Contexto

Esta skill produz um **mapa de curadoria de pautas** antes da produção semanal. Não gera posts completos — entrega hipóteses de pauta para aprovação antes de qualquer produção.

**Criador:** [NOME_CRIADOR]
**Nicho:** [DESCRICAO_NICHO — ex: consultoria tributária, headhunting executivo, e-commerce]
**ICP principal:** [DESCRICAO_ICP — ex: CFOs de PME, donos de e-commerce R$200k+/mês]
**Plataformas:** [PLATAFORMAS — ex: LinkedIn, Instagram, TikTok]
**Perfil para scraping:** [URL_PERFIL_LINKEDIN ou URL_PERFIL_OUTRA_REDE]

---

## Passo 1 — Scraping de performance (quando disponível)

Antes de mapear pautas, verificar o que performou recentemente no perfil do criador.

**Actor Apify recomendado:** `harvestapi/linkedin-profile-posts`

**Input para LinkedIn:**
```json
{
  "targetUrls": ["[URL_PERFIL_LINKEDIN]"],
  "maxPosts": 14
}
```

**O que analisar nos últimos 14 posts:**
- Formato com maior tração (reações + comentários)
- Hook do post mais forte — estrutura específica
- Temas com baixo engajamento — evitar na semana atual
- Padrão dado concreto vs. abstrato

**Output obrigatório antes de mapear pautas:**

| Post | Reações | Formato | Por que funcionou | Impacto na semana |
|---|---|---|---|---|
| [tema] | [N] | [formato] | [razão] | [usar/evitar/adaptar] |

Se algum tema planejado colidiu com o que não performou, propor ajuste antes de seguir.

---

## Passo 2 — Pesquisa de tendências externas

Buscar sinais externos relevantes para o nicho do criador. Fontes a checar:

### Redes sociais e perfis de referência

Perfis de referência para acompanhar:
- [PERFIL_REFERENCIA_1 — ex: conta de um criador do mesmo nicho]
- [PERFIL_REFERENCIA_2]
- [PERFIL_REFERENCIA_3]

O que captar desses perfis:
- Temas gerando engajamento alto nessa semana
- Linguagem e dores que aparecem nos comentários
- Formatos visuais que estão tendo tração

### Fontes de notícias e dados do nicho

Fontes relevantes para [NICHO_DO_CRIADOR]:
- [FONTE_1 — ex: Receita Federal, SPED, Diário Oficial]
- [FONTE_2 — ex: relatório setorial, IBGE, associação do setor]
- [FONTE_3]

### Fóruns, grupos e comunidades

Onde o ICP do criador faz perguntas e reclama:
- [FORUM_OU_GRUPO_1 — ex: grupo LinkedIn de CFOs, fórum e-commerce]
- [FORUM_OU_GRUPO_2]

---

## Passo 3 — Estrutura do mapa de pautas

Saída obrigatória antes de qualquer produção:

```markdown
# Mapa de Pautas — Semana XX
## [NOME_CRIADOR]
**Período:** DD a DD de [Mês] de [Ano]

---

## Sinais externos desta semana

[Lista dos 3-5 sinais relevantes encontrados — notícia, dado, post de referência, pergunta frequente do ICP]

---

## Hipóteses de pauta

### Hipótese 1 — [título curto]
**Público:** [quem vai ler/ver]
**Dor:** [dor de negócio que ativa]
**Tradução para o nicho:** [como isso se conecta ao universo do criador]
**Risco técnico:** [algo a checar antes de produzir]
**Plataformas sugeridas:** [LinkedIn, Instagram, TikTok]
**Formato sugerido:** [contrarian, tutorial, case, lead magnet, listicle]
**Fonte/link:** [link, dado, notícia ou "sem material"]

### Hipótese 2 — [título curto]
[idem]

### Hipótese 3 — [título curto]
[idem]

[repetir para 5-7 hipóteses]

---

## Anti-repetição

**Temas usados nas últimas 2 semanas:** [listar para evitar]
**CTAs usados recentemente:** [listar para rodar]
**Ângulos a evitar esta semana:** [baseado no scraping]

---

## Próximo passo

Aprovar as hipóteses antes da produção.
Quando aprovado, acionar a skill de conteúdo com os temas confirmados.
```

---

## Passo 4 — Análise de concorrentes (opcional)

Quando o usuário pedir análise de concorrentes, scraping via Apify:

**Actor:** `harvestapi/linkedin-profile-posts`

**Input:**
```json
{
  "targetUrls": ["[URL_CONCORRENTE_1]", "[URL_CONCORRENTE_2]"],
  "maxPosts": 10
}
```

**O que comparar:**
- Temas que o concorrente cobre e o criador não cobre ainda
- Ângulos já saturados no nicho — evitar repetição
- Lacunas de conteúdo que o criador pode ocupar
- Formatos com mais engajamento nos concorrentes

---

## Regras do mapa de pautas

- O mapa de pautas não é a versão final do conteúdo. Ele valida direção antes da produção.
- Entregar hipóteses enxutas, não posts desenvolvidos.
- Não incluir legenda completa, hook final, CTA final ou texto pronto no mapa.
- Se não houver dados de scraping disponíveis, sinalizar e avançar com fontes externas.
- Perfis de criadores de outros nichos servem para captar dor e linguagem. A tradução obrigatória é sempre para o universo do [NICHO_DO_CRIADOR].
- Antes de propor pauta, verificar nas últimas 2 semanas produzidas se o tema já foi coberto.

---

## Fontes Apify disponíveis no ambiente

| Actor | Uso |
|---|---|
| `harvestapi/linkedin-profile-posts` | Scraping de posts do LinkedIn |
| `harvestapi/instagram-profile-scraper` | Scraping de posts do Instagram |
| `apify/tiktok-scraper` | Scraping de vídeos do TikTok |
| `apify/google-search-scraper` | Busca no Google por palavras-chave do nicho |
| `apify/web-scraper` | Scraping de páginas específicas |

Para acionar qualquer scraper via MCP Apify, passar o nome do actor e o input JSON.

---

## Saída esperada desta skill

Um arquivo `.md` com:
- Tabela de performance dos últimos posts (quando scraping disponível)
- Lista de sinais externos da semana
- 5-7 hipóteses de pauta estruturadas
- Mapa de anti-repetição
- Indicação de próximos passos

**Não** incluir post completo, legenda final ou texto de conteúdo produzido.
