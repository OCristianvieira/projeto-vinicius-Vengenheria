# Skills — VF Engenharia + Styem

Biblioteca de skills para usar com Claude Code. Cada pasta é uma categoria. Dentro de cada skill há um `SKILL.md` com instruções de uso.

**Como ativar uma skill:** abra o Claude Code, clique em "Add Context" e selecione o arquivo `SKILL.md` da skill desejada. Ou mencione o nome da skill no chat.

---

## Estrutura

```
skills/
├── documentos/          — PDF, Word, Excel, PowerPoint, conversão
├── pesquisa/            — Pesquisa web, YouTube, roteiros
├── visual-design/       — Infográficos, diagramas, wireframes, design
├── automacao-produtividade/ — Criação de skills, SOPs, prompts
├── marketing/           — Produção de conteúdo, imagens, pautas (templates genéricos)
│   └── instaladores/    — Instaladores de sistema visual e Instagram
│
│ (Skills específicas da VF Engenharia ficam no nível acima desta pasta)
├── proposta-vinicius/   — Gera proposta em .docx e .pptx
├── contrato-vinicius/   — Gera contrato em .docx
└── followup-vinicius/   — Registra lead no Google Sheets
```

---

## Documentos

| Skill | O que faz | Quando usar |
|-------|-----------|-------------|
| `pdf` | Ler, extrair, combinar, dividir, OCR em PDFs | Qualquer operação com arquivo .pdf |
| `docx` | Criar e editar documentos Word | Relatórios, laudos, memorandos em .docx |
| `xlsx` | Criar e editar planilhas Excel | Planilhas de custo, orçamento, controle |
| `pptx` | Criar e editar apresentações PowerPoint | Apresentações, propostas em slides |
| `markitdown` | Converter PDF, DOCX, PPTX, imagens para Markdown | Extrair conteúdo de qualquer arquivo |
| `financial-document-parser` | Extrair dados de notas fiscais e extratos | Processar documentos financeiros |
| `file-organizer` | Organizar pastas e arquivos automaticamente | Limpar e estruturar diretórios |

---

## Pesquisa e conteúdo

| Skill | O que faz | Quando usar |
|-------|-----------|-------------|
| `research` | Pesquisa estruturada geral | Levantar informações sobre qualquer tema |
| `web-research` | Pesquisa na web com método | Busca aprofundada com fontes |
| `auto-research` | Pesquisa automatizada | Pesquisa recorrente ou em lote |
| `youtube-transcribe-skill` | Transcreve vídeos do YouTube | Extrair conteúdo de vídeo |
| `roteiro-video` | Gera roteiros para YouTube, TikTok, Reels | Criar script de vídeo |

---

## Visual e design

| Skill | O que faz | Quando usar |
|-------|-----------|-------------|
| `infografico` | Gera infográficos em HTML/CSS prontos para PNG | Material visual educativo ou de apresentação |
| `mermaid-gen` | Gera diagramas de fluxo e processos | Documentar processos técnicos |
| `wireframe` | Wireframes ASCII antes de codar | Planejar layout de interface ou documento |
| `frontend-design` | Interfaces web e landing pages | Criar páginas HTML/CSS |
| `canvas-design` | Arte visual, posters, PDFs | Peças gráficas estáticas |
| `data-storytelling` | Transforma dados em narrativas visuais | Apresentar análises para clientes |

---

## Automação e produtividade

| Skill | O que faz | Quando usar |
|-------|-----------|-------------|
| `skill-creator` | Cria e melhora skills novas | Criar automações personalizadas |
| `gerar-sop` | Gera SOPs de processos | Documentar procedimentos operacionais |
| `prompt-enhancer` | Melhora prompts com flag `--enhance` | Refinar instruções para IA |
| `construtor-prompts` | Constrói prompts estruturados | Montar prompts complexos |
| `tweet-crafter` | Gera posts curtos otimizados | Conteúdo para redes sociais |

---

## Marketing (templates genéricos — preencher placeholders)

Estas skills são templates. Antes de usar, abrir o arquivo e substituir todos os `[PLACEHOLDER]` pelos dados reais do cliente ou projeto.

| Skill | O que faz |
|-------|-----------|
| `skill-producao-conteudo.md` | Produção semanal de posts — LinkedIn, TikTok, YouTube, Instagram |
| `skill-imagens-json.md` | JSONs de imagem — carrossel, infográfico, tweet fake, framework, capa |
| `skill-pautas-pesquisa.md` | Pré-briefing, mapa de pautas, scraping de concorrentes |
| `instaladores/instalador-design-generico.md` | Sistema visual — paleta, tipografia, templates T1-T9 |
| `instaladores/instalador-instagram-generico.md` | Instagram — carrossel, legenda, reels, stories |
| `instaladores/instalador-conteudos-isca-generico.md` | Iscas — replicar estrutura de criadores de referência |

**Placeholders obrigatórios em todos:** `[NOME_CRIADOR]`, `[DESCRICAO_NICHO]`, `[DESCRICAO_ICP]`, `[HEX_COR_PRIMARIA]`, `[HANDLE_INSTAGRAM]`

---

## Skills específicas da VF Engenharia

| Skill | O que faz |
|-------|-----------|
| `proposta-vinicius` | Gera proposta comercial em .docx e .pptx com dados do cliente |
| `contrato-vinicius` | Gera contrato preenchido em .docx |
| `followup-vinicius` | Registra lead na planilha de follow-up no Google Sheets |
