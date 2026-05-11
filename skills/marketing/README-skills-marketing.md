# Skills Marketing — Templates Genéricos

Pasta com skills e instaladores prontos para adaptar a qualquer cliente novo.
Duplicar, preencher os placeholders e ativar. Nada aqui deve ser modificado como "versão ativa" — sempre duplicar antes de customizar.

---

## Skills (ativar via chat)

| Arquivo | Função |
|---|---|
| [skill-producao-conteudo.md](skill-producao-conteudo.md) | Produção semanal de posts — LinkedIn, TikTok, YouTube, Instagram |
| [skill-imagens-json.md](skill-imagens-json.md) | JSONs de imagem — carrossel, infográfico, tweet fake, framework, capa |
| [skill-pautas-pesquisa.md](skill-pautas-pesquisa.md) | Pré-briefing, mapa de pautas, scraping Apify, análise de concorrentes |

## Instaladores (contexto de produção)

| Arquivo | Função |
|---|---|
| [instaladores/instalador-design-generico.md](instaladores/instalador-design-generico.md) | Sistema visual — paleta, tipografia, templates T1-T9, JSONs |
| [instaladores/instalador-instagram-generico.md](instaladores/instalador-instagram-generico.md) | Instagram — carrossel, legenda, reels, stories, CTAs |
| [instaladores/instalador-conteudos-isca-generico.md](instaladores/instalador-conteudos-isca-generico.md) | Iscas — replicar estrutura de criadores de referência |

---

## Como usar

1. Copiar o arquivo desejado para a pasta do cliente novo.
2. Renomear: `skill-producao-conteudo.md` → `skill-producao-[cliente].md`
3. Abrir o arquivo e substituir todos os `[PLACEHOLDER]` pelos dados reais.
4. Ativar no chat como context ou skill.

---

## Placeholders obrigatórios em todos os arquivos

| Placeholder | O que preencher |
|---|---|
| `[NOME_CRIADOR]` | Nome completo do cliente |
| `[DESCRICAO_NICHO]` | Nicho de atuação |
| `[DESCRICAO_ICP]` | Perfil do cliente ideal |
| `[PLATAFORMAS]` | LinkedIn, Instagram, TikTok, YouTube |
| `[CAMINHO_BASE_CONTEUDO]` | Caminho absoluto da pasta de conteúdo |
| `[CAMINHO_REFERENCIAS_DESIGN]` | Caminho da pasta de referências visuais |
| `[HEX_COR_PRIMARIA]` | Hex da cor principal da marca |
| `[HEX_COR_SECUNDARIA]` | Hex da cor secundária |
| `[HANDLE_INSTAGRAM]` | Handle do Instagram sem @ |
| `[HANDLE_TWITTER_OU_INSTAGRAM]` | Handle para tweet fake |

---

## Origem

Duplicado e generalizado a partir de:
- `posts-cristian` (skill de conteúdo do Cristian)
- `imagens-power` (skill de imagens do Cristian)
- `instalador_instagram.md` (Cristian)
- `instalador_infografico.md` (Cristian)
- `conteudo/iscas/MOTHER_REPLICANT.md` + instaladores individuais de iscas
