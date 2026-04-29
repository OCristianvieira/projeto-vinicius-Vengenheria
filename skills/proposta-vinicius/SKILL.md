---
name: proposta-vinicius
description: >
  Gera proposta comercial da VF Engenharia em .docx com layout fiel ao modelo original
  (imagem de capa ponta a ponta, Montserrat nos títulos, Arial no corpo, bullets, rodapé com logo).
  Também gera versão .pptx premium 16:9 via pptxgenjs nas cores VF.
  Use SEMPRE QUE Vinicius mencionar "gerar proposta", "fazer proposta", "proposta para cliente",
  "montar proposta", "nova proposta", "proposta do Vini", "PPCI", "RPCI", "habite-se", "laudo",
  "proposta de serviço" ou qualquer variação.
argument-hint: "[nome-cliente] [tipo: PPCI|PPCI+AVCB|RPCI|HABITE-SE] [area-m2] [cidade] [valor]"
---

# Proposta VF Engenharia

Gera propostas para Vinicius Marcos Figueiredo, Engenheiro Civil, CREA 198631-4.
Empresa: VF Engenharia — PPCI, RPCI + Habite-se, laudos e regularizações junto ao CBMSC.

---

## TIPOS DE PROPOSTA

| Tipo | Páginas | Seções |
|------|---------|--------|
| PPCI | 2 | Descrição, Incluso, Sistemas Preventivos, Prazo / Não Incluso, Valor, Resp. Técnica, Acervo |
| PPCI+AVCB | 2 | Igual ao PPCI + itens extras no Incluso |
| RPCI | 1 | Descrição, Incluso, Não Incluso, Valor (3x), Resp. Técnica |
| HABITE-SE | 1 | Descrição, Incluso, Não Incluso, Valor (50/50), Resp. Técnica |

---

## DADOS A COLETAR

Se não fornecidos, perguntar nesta ordem:

1. Tipo de serviço (PPCI / PPCI+AVCB / RPCI / HABITE-SE)
2. Nome do cliente/empresa
3. Telefone de contato
4. Área construída em m²
5. Cidade da edificação
6. Para PPCI/PPCI+AVCB: número da tabela, divisões do grupo, altura
7. Valor (número e por extenso)

---

## PASSO A PASSO

### 1. Coletar dados

### 2. Gerar o .docx

Usar `references/gerar_docx_vf.js` como base.
Copiar para `/tmp/gerar_docx_vf_[[cliente_lower]].js`.
Substituir o objeto `d` no topo do script com os dados do cliente.
Rodar:
```
NODE_PATH=$(npm root -g) node /tmp/gerar_docx_vf_[[cliente_lower]].js
```
Salvar em: `clientes/ativos/vinicius/propostas/proposta_[[cliente_lower]]_[[data]].docx`

**Imagens necessárias** (já estão em `recursos/templates/` na pasta do cliente):
- `capa_wide.png` — foto de capa ponta a ponta com banner "PROPOSTA DE SERVIÇO"
- `logo_vf.jpg` — logo VF Engenharia para o rodapé

O caminho `RES` no script aponta para essa pasta. No PC do Vini, atualizar para o caminho local.

### 3. Gerar o .pptx premium

Usar `references/gerar_pptx_vf.js` como base.
Substituir o objeto `dados` com os dados do cliente.
Rodar:
```
NODE_PATH=$(npm root -g) node /tmp/gerar_proposta_vf_[[cliente_lower]].js
```
Salvar em: `clientes/ativos/vinicius/propostas/slides_[[cliente_lower]]_[[data]].pptx`

### 4. Perguntar sobre follow-up

"Quer registrar [[CLIENTE]] na planilha de follow-up?"

---

## IDENTIDADE VISUAL VF (docx)

```
Títulos:    Montserrat Bold AllCaps 12pt — cor #1A1A1A
Corpo:      Arial 11pt — cor #1A1A1A — justificado
Bullets:    Arial 11pt — ponto redondo
Rodapé:     Arial 9pt — cor #666666
Separador:  linha cinza clara acima do rodapé
```

## IDENTIDADE VISUAL VF (pptx)

```
Cor primária:  #D94F3D (vermelho)
Fundo escuro:  #1A1A1A (preto)
Texto claro:   #F5F5F5
Fonte títulos: Arial Black bold uppercase
Fonte corpo:   Arial
```

---

## DADOS FIXOS VF ENGENHARIA

```
Engenheiro: Vinicius Marcos Figueiredo
CREA: 198631-4
Endereço: Rua José de Araújo, 39 — Barreiros, São José/SC
Telefone: (48) 98874-9269
E-mail: contato@vf-engenharia.com
Site: www.vf-engenharia.com
Validade: 15 dias
```

Textos completos de cada tipo em `references/tipos_proposta.md`.