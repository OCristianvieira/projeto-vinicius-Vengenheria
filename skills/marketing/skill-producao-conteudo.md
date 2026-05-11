---
name: producao-conteudo-generico
description: >
  Produz conteúdo semanal para criador de conteúdo — LinkedIn, TikTok/Reels, YouTube e Instagram.
  Use esta skill quando o usuário pedir posts da semana, roteiros, conteúdo para plataforma específica
  ou quando mencionar "fazer a semana", "meus posts", "meu conteúdo", "série", "próxima semana".
  Gera .md + .docx para LinkedIn (7 posts), TikTok/Reels (roteiros AIDA), YouTube (roteiros longos)
  e Instagram Reels. Preencher os placeholders antes de usar.
---

# Skill: Produção de Conteúdo Semanal — [CLIENTE]

> **Como usar esta skill:**
> Substitua todos os campos marcados com `[PLACEHOLDER]` pelos dados reais do cliente
> antes de ativar. Os placeholders estão marcados com colchetes e letras maiúsculas.

---

## Contexto do criador

**Nome:** [NOME_CRIADOR]
**Série ou tema principal:** [NOME_DA_SERIE ou TEMA_CENTRAL]
**Público-alvo:** [DESCRICAO_DO_ICP — ex: donos de empresa, CFOs, gestores]
**Produto/serviço:** [O_QUE_O_CRIADOR_VENDE ou POSICIONA]
**CTA fixo:** [FRASE_CTA_PADRAO — ex: "Me manda a tarefa que você mais odeia"]

**Paleta de cores (docx):**
- Primária: `[HEX_COR_PRIMARIA]`
- Secundária: `[HEX_COR_SECUNDARIA]`
- Cinza texto: `#555555`
- Preto texto: `#222222`

---

## Fluxo de trabalho

### 0. Organização de arquivos

Base do criador:

`[CAMINHO_BASE_CONTEUDO]`

Toda produção deve seguir:

```text
[CAMINHO_BASE_CONTEUDO]/[mes]/semana [N]/
├── youtube/
├── instagram/
├── linkedin/
└── tiktok/
```

Regras:
- Cada plataforma recebe apenas seus próprios `.md`.
- Não deixar MD solto direto na pasta da semana.
- Ao iniciar semana nova, criar as pastas de plataforma.

### 1. Entender o contexto da semana

Antes de gerar qualquer conteúdo, o usuário fornece (ou você pergunta):
- Número da semana
- Dias cobertos
- Temas ou ângulos por dia e canal

### 2. Gerar os canais na sequência

1. LinkedIn
2. TikTok/Reels
3. YouTube (selecionar 3 dias com maior potencial visual)
4. Instagram

---

## Canal 1: LinkedIn

### Estrutura do MD

```markdown
# SEMANA XX — LINKEDIN — [NOME_CRIADOR]
**Período:** Semana XX · [Mês] [Ano]
**Canal:** LinkedIn
**Dias cobertos:** [primeiro] ao [último]
**Status:** Produção

---

## [DIA DA SEMANA] | [TEMA DO POST]

**Formato:** [tipo de post]
**Dor:** [dor que resolve em uma linha]

---

[corpo do post]

#[hashtag1] #[hashtag2] #[hashtag3]

---
```

### Estilo de legenda

```
[Hook — primeira linha forte que para o scroll] 👇

[1-2 frases diretas sobre o tema]

[lista numerada do que será mostrado — 3 itens]

Solução perfeita para:
✅ [perfil 1 específico]
✅ [perfil 2 específico]
✅ [perfil 3 específico]

[CTA nos comentários ou direct]
```

### Regras críticas LinkedIn

- Sem travessão em nenhum contexto
- Sem padrão "não é X. É Y."
- Sem frases isoladas de 2-3 palavras sem verbo
- Hook com 👇 na primeira linha
- Lista numerada do que a skill/tema faz (3 itens)
- 3 perfis específicos do público com ✅
- Sem emojis exceto 👇 e ✅
- Números reais quando possível (tempo, quantidade, resultado)
- Hook pessoal, nunca genérico — observação em 1ª pessoa
- Sem negativa óbvia após hook ("Não é exagero.", "Não é coincidência.")
- Repetições em série trianguladas: 2 na 1ª linha, 1 na 2ª — nunca 1+1+1+1
- Parágrafos variados: 1, 2 e 3 linhas misturados

### Formatos por dia

- Post educacional: explica o tema + resultado concreto com números
- Post contrarian: afirmação que vai contra o senso comum
- Listicle: lista com insight em cada item
- Lead magnet: CTA direto para ação
- Story (bastidor): situação real ou realista de aplicação

### Checklist anti-IA para LinkedIn

- [ ] Sem verbos corporativos: alavancar, potencializar, maximizar, impulsionar
- [ ] Sem "no cenário atual" ou "no mundo moderno"
- [ ] Sem "navegar pela complexidade"
- [ ] Sem estrutura "não se trata apenas de X, se trata de Y"
- [ ] Sem frases de 2-3 palavras isoladas sem verbo
- [ ] Sem travessão
- [ ] Todos os posts com número real ou cenário concreto
- [ ] CTA direto e sem promessa vaga
- [ ] Sem negativa óbvia logo após o hook
- [ ] Hook não generaliza com "a maioria dos X"
- [ ] Repetições trianguladas
- [ ] Ritmo de parágrafos variado

---

## Canal 2: TikTok / Reels

### Formato de roteiro (linha a linha)

```
TEMA: [tema do vídeo]
DURAÇÃO ESTIMADA: [X segundos]

OPÇÕES DE HOOK (recomendado: opção X)
A) ⭐ "[hook recomendado]"
B) "[alternativa]"
C) "[alternativa]"

[HOOK]
[texto exato — 1-2 frases]

[DESENVOLVIMENTO]
[roteiro linha a linha — cada linha = 1 ação visível na tela]

[RESULTADO]
[mostrar o que aparece na tela]

[CTA]
[texto exato — soft, nunca venda direta]

NOTAS DE GRAVAÇÃO:
- [instrução específica de tela]
- [onde pausar]
- [o que destacar]
```

### Regras críticas TikTok / Reels

- Hook nos primeiros 3-5s — nunca "Olá", "Hoje vou mostrar"
- Tom coloquial: "cê", "tá", "vai lá", "olha o que acontece"
- Demo visual linha a linha — cada frase = 1 ação visível
- Especificidade: nome do botão, da tela, do resultado exato
- 3 opções de hook sempre (recomendado com ⭐)
- Duração: 60-90s por vídeo
- CTA soft: "me segue", "curte e salva", "me chama no direct"
- Sem venda direta no CTA

---

## Canal 3: YouTube

### Seleção de dias

Escolher 3 dias com maior potencial visual. Critérios:
1. Tem demonstração cronometrável
2. Tem momento de revelação (antes/depois)
3. Tem output visual forte

### Estrutura de cada roteiro

```
[0:00-0:45] — HOOK DE ABERTURA
  → Entrar direto no ponto, sem apresentação longa

[0:45-2:30] — CONTEXTO DO PROBLEMA
  → Custo escondido (tempo, inconsistência, retrabalho)

[2:30-4:30] — ANATOMIA DO TEMA
  → Mostrar o mecanismo ou ferramenta

[4:30-7:30] — DEMONSTRAÇÃO AO VIVO
  → Cenário realista com dados concretos

[7:30-9:30] — COMO REPLICAR
  → 3 perguntas ou passos para o espectador aplicar

[9:30-11:00] — VARIAÇÕES E CASOS DE USO
  → 3 aplicações além do exemplo principal

[11:00-12:00] — ENCERRAMENTO + CTA
  → Ação concreta + próximo vídeo + pergunta de comentário
```

### Regras críticas YouTube

- Não usar apresentação longa no início
- Cronometrar ao vivo quando possível
- Generalizar sempre além do exemplo (3 casos de uso)
- Tom educativo mas direto

---

## Canal 4: Instagram

### Formatos por post

- **Carrossel:** ensino, lista, provocação — 1 ideia por slide, gancho no primeiro, CTA ou mic drop no último
- **Legenda para foto:** gancho na primeira linha, parágrafos de 1-2 linhas, CTA sutil
- **Reels:** hook nos 3 primeiros segundos, cortes rápidos, fala direta

### CTA padrão

- `Comenta "[PALAVRA_CHAVE]" que eu mando no direct`
- Ou CTA de engagement leve: pergunta aberta, mic drop sem CTA

### Regras críticas Instagram

- Parágrafos de 1-2 linhas
- Sem expressões da lista negra: "mudou o jogo", "game changer", "revolucionou"
- Sem implorar engajamento
- Tom confiante e desapegado
- Sem travessão

---

## Geração de DOCX

### Setup
- Node.js com `docx` npm instalado em `/tmp/node_modules`
- Executar sempre a partir de `/tmp`: `cd /tmp && node script.js`

### Paleta

```javascript
const COR_PRIMARIA = '[HEX_COR_PRIMARIA]';
const COR_SECUNDARIA = '[HEX_COR_SECUNDARIA]';
const CINZA = '555555';
const PRETO = '222222';
```

### LinkedIn DOCX

- Título principal: Heading 1 na cor primária
- Cada dia: Heading 1 com nome do dia
- Corpo do post: parágrafos normais
- Hashtags: itálico na cor primária ao final
- Separadores: linha na cor secundária entre posts
- Checklist anti-IA ao final

### TikTok DOCX

- Fases do roteiro em cor primária
- Legenda em itálico
- Notas de gravação em cinza com bullets

---

## Ordem de entrega

1. MD LinkedIn → confirmar com o usuário
2. DOCX LinkedIn
3. MD TikTok/Reels
4. DOCX TikTok/Reels
5. MD YouTube (3 dias justificados)
6. DOCX YouTube
7. MD Instagram

Avisar o usuário quando cada arquivo for salvo com o caminho completo.
