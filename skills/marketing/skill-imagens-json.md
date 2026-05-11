---
name: imagens-json-generico
description: >
  Gera JSONs de imagem para marca pessoal — carrossel, infográfico, tweet fake, framework, capa, thumbnail.
  Use quando o usuário pedir imagens, criativos, JSONs, carrossel, infográfico ou posts visuais.
  Preencher os placeholders antes de usar.
user-invocable: true
---

# Imagens — [CLIENTE]

> **Como usar esta skill:**
> Substitua todos os campos marcados com `[PLACEHOLDER]` pelos dados reais do cliente
> antes de ativar. Os placeholders estão marcados com colchetes e letras maiúsculas.

---

## Contexto

Esta skill gera prompts em JSON para imagens da marca pessoal de [NOME_CRIADOR].

Usar para:
- [SERIE_OU_TEMA_PRINCIPAL]
- Conteúdo sobre [NICHO_DO_CRIADOR]
- LinkedIn, Instagram, TikTok/Shorts thumb, carrosséis e infográficos

---

## Modo de Ativação

Quando o usuário ativar esta skill, não gerar JSON direto sem briefing.

Primeiro conduzir um mini-briefing objetivo (máximo 5 perguntas):
1. Qual é a semana, campanha ou pasta de trabalho?
2. Quais formatos serão criados? (carrossel, infográfico, tweet fake, framework, capa, thumbnail)
3. Quantas peças de cada formato?
4. Para carrossel: formato `3:4` ou `4:5` e quantidade de slides.
5. Pode usar referências humanas da pasta de pessoas? Se sim, quantas e estilo preferido.

Confirmação obrigatória de estilo antes de gerar:
- Sempre confirmar qual estilo: Magazine Brutalista, Preto e Branco, Minimalista, ou combinação.
- Se pedir combinação, perguntar se a troca é por peça inteira ou dentro do mesmo carrossel.
- Por padrão, um carrossel usa um estilo único do slide 1 ao último.
- Só misturar estilos dentro do mesmo carrossel quando o usuário autorizar.

Depois do briefing, responder com resumo do plano:
- formatos e quantidade
- estilo escolhido
- referências liberadas
- arquivo `.md` onde os JSONs serão salvos

Só então gerar os JSONs.

---

## Biblioteca de Referências

Pasta principal de referências visuais:

`[CAMINHO_REFERENCIAS_DESIGN]`

Estrutura:
- `Infograficos/`: biblioteca de infográficos. Escolher uma amostra de 20-30 imagens, avaliar qual estrutura combina com o conteúdo e usar 1 referência principal.
- `Carrossel/Estilo 01` a `Carrossel/Estilo N`: cada pasta = um estilo. Para carrossel, escolher uma pasta e seguir a sequência interna. Não misturar slides de estilos diferentes no mesmo carrossel.
- `pessoas/`: referências humanas. Usar subpastas como `founders`, `creators`, `genericas-premium`.

Estilos disponíveis:
- `Estilo 03` = Preto e Branco
- `Estilo 04` = Magazine Brutalista
- `Estilo 05` = Minimalista
- `Estilo 06` = Quadros Brancos
- [ADICIONAR_OUTROS_ESTILOS_APROVADOS]

Ao gerar:
- Evitar repetir a mesma referência usada recentemente.
- Consultar sumário de referências anteriores antes de escolher imagem humana.
- Para infográfico, copiar estrutura visual da referência, não o conteúdo.
- Para carrossel, copiar lógica de sequência, ritmo e relação texto/imagem do estilo.

---

## Pasta de Trabalho e Salvamento

Base de conteúdo:

`[CAMINHO_BASE_CONTEUDO]`

Organização padrão:

```text
[CAMINHO_BASE_CONTEUDO]/[mes]/semana X/[plataforma]/
```

Nome do arquivo:

`[slug-do-tema]-[YYYY-MM-DD]-[formato].md`

Exemplos:
- `automacao-vendas-2026-05-02-carrossel.md`
- `reducao-custos-2026-05-02-infografico.md`

Regras:
- Slug curto, descritivo e em kebab-case.
- Data no formato `YYYY-MM-DD`.
- Formato: `carrossel`, `infografico`, `tweet-fake`, `framework`, `capa` ou `thumbnail`.
- Não usar nomes genéricos como `jsons-imagens.md`.

Estrutura do arquivo:

~~~markdown
# JSONs de Imagens — [semana/campanha]

## Briefing
- Formatos:
- Quantidade:
- Estilo:
- Referências humanas:
- Observações:

## JSONs

### SLIDE 01 — [função]
```json
{ ... }
```

## Sumario de Referencias Por Slide

- Slide 1 = imagem 016
- Slide 2 = imagem 029
- Slide 3 = sem imagem humana
~~~

---

## Identidade Visual

**Pessoa:** [NOME_CRIADOR]
**Assinatura padrão:** `[NOME_CRIADOR]`
**Handle para tweet fake:** `[HANDLE_TWITTER_OU_INSTAGRAM]`
**Tom visual:** [DESCRICAO_TOM_VISUAL — ex: técnico, direto, energético, editorial]

**Paleta base:**
- Primária: `[HEX_COR_PRIMARIA]`
- Primária clara (glow/hover): `[HEX_COR_PRIMARIA_CLARA]`
- Preto: `#0F0F0F`
- Branco: `#FFFFFF`
- Off-white: `#F7F3EE`
- Cinza texto: `#555555`
- Cinza claro: `#EDEBE7`

A paleta base só vale quando o usuário não escolhe um estilo específico. Quando o usuário pedir estilo nomeado (brutalista, preto e branco, minimalista), seguir a paleta daquele estilo.

---

## Regra de Saída

Entregar cada imagem separada e rotulada:

```markdown
**IMAGEM 01 — [tipo]**
```json
{ ... }
```
```

Para carrossel, entregar cada slide separado com rótulo `SLIDE 01`, `SLIDE 02`, etc.

Confirmar o formato (`3:4` ou `4:5`) antes de gerar qualquer carrossel.

Todo JSON deve começar com:

```json
{
  "dia-metadado": "[dia] — [sistema] — imagem 0X",
  "metadata": {
    "template": "...",
    "formato": "...",
    "cliente": "[NOME_CRIADOR]",
    "semana": 0,
    "dia": "...",
    "data_criacao": "YYYY-MM-DD",
    "tema": "tema do lote em linguagem simples",
    "post": "slug-do-post",
    "aviso_renderizacao": "PROIBIDO exibir como texto visível: nomes de fontes, tamanhos em px, códigos hex, coordenadas, pesos tipográficos ou qualquer metadado técnico. Esses dados são instruções de renderização, não conteúdo."
  }
}
```

---

## Sistemas Visuais

### 1. Capa Editorial

- Formato: `4:5`
- Fundo: branco, cinza claro ou cor primária escura
- Headline grande com palavra em destaque na cor primária
- Visual abaixo: interface, diagrama, print conceitual, ilustração técnica
- Assinatura: `[NOME_CRIADOR]`

### 2. Tweet Fake

- Formato: `3:4`
- Simular tweet real, modo light ou midnight
- Sem logo X
- Sem assinatura inferior
- Sem linha textual duplicada de métricas
- Apenas linha de ícones com números: comentário, repost, coração, bookmark, share
- Nome: `[NOME_CRIADOR]`
- Handle: `[HANDLE_TWITTER_OU_INSTAGRAM]`
- O handle só aparece em tweet fake — nunca em framework, infográfico ou carrossel

### 3. Framework / Infográfico

- Formato: `4:5`
- Usar pasta `[CAMINHO_REFERENCIAS_DESIGN]/Infograficos` como biblioteca
- Abrir amostra de referências, escolher 1 estrutura e declarar qual foi usada no `.md`
- Copiar estrutura da referência, não o conteúdo
- Adaptar para mecanismo do post: fluxo, funil, pirâmide, ciclo, checklist, diagnóstico
- Rodapé com `[NOME_CRIADOR]`
- Handle nunca no framework

### 4. Thumbnail Reels / Shorts

- Formato: `9:16`
- Headline com 3-7 palavras
- Contraste alto
- Elemento visual central forte
- Sem excesso de texto

### 5. Carrossel Editorial

- Confirmar formato (`3:4` ou `4:5`) antes de gerar
- Se `3:4`, canvas `1080x1440`
- Arte cobre 100% do canvas — sem card interno, sem margem, sem borda arredondada
- Assinatura `[NOME_CRIADOR]` — geralmente no topo esquerdo
- Handle nunca no carrossel
- Sem badges, nav labels ou categorias decorativas que não fazem parte da narrativa real

---

## Etapa Obrigatória — Checagem de Linguagem

Antes de gerar qualquer JSON, revisar internamente o texto dos campos `conteudo`:

- Remover travessão do texto visível
- Evitar estrutura batida "não é X, é Y"
- Evitar frases genéricas: "o futuro da IA", "revolucione sua produtividade", "desbloqueie seu potencial"
- Preferir linguagem concreta e operacional
- Manter português brasileiro simples e direto

Para carrossel, checagem narrativa adicional:
- Os slides formam sequência contínua, não frases soltas independentes
- Slide 1 abre tensão ou pergunta
- Slides 2-4 desenvolvem o problema e o mecanismo
- Último slide fecha com síntese ou CTA
- Cada slide parece continuação do anterior

---

## Sumario de Referencias

No final de cada `.md`, incluir:

```markdown
## Sumario de Referencias Por Slide

- Slide 1 = imagem 016
- Slide 2 = imagem 029
- Slide 3 = sem imagem humana
```

Usar o número do arquivo quando a referência estiver em pasta numerada. Escrever `sem imagem humana` quando não houver pessoa no slide.

---

## Checklist Antes de Entregar

- [ ] Cada imagem separada e rotulada
- [ ] JSON válido, sem quebras inválidas dentro de strings
- [ ] `aviso_renderizacao` presente no metadata
- [ ] Sem assinatura duplicada
- [ ] Tweet fake sem métricas duplicadas
- [ ] Framework usou referência visual quando fornecida
- [ ] Assinatura como `[NOME_CRIADOR]`
- [ ] Handle apenas em tweet fake
- [ ] Tweet fake sem laranja decorativo, blob ou gradiente de marca
- [ ] Textos em português quando houver CTA ou rodapé
- [ ] Formato do carrossel confirmado antes de gerar
- [ ] Se carrossel 3:4, canvas `1080x1440` e arte cobre 100% sem card interno
- [ ] Nenhum metadado técnico renderizado como texto visível
