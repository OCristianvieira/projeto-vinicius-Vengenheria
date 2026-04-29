---
name: contrato-vinicius
description: >
  Gera contrato de prestação de serviços da VF Engenharia em .docx fiel ao modelo original.
  Edita o XML do contrato base substituindo apenas os campos variáveis — sem alterar estrutura,
  cláusulas fixas, formatação ou layout.
  Use SEMPRE QUE Vinicius mencionar "gerar contrato", "fazer contrato", "contrato para cliente",
  "montar contrato", "contrato do Vini", "termo de contrato" ou qualquer variação.
argument-hint: "[nome-cliente] [tipo: PPCI|RPCI|HABITE-SE] — ou perguntar com base em qual proposta"
---

# Contrato VF Engenharia

Gera contratos para Vinicius Marcos Figueiredo, Engenheiro Civil, CREA 198631-4.
Empresa: VF Engenharia LTDA.

O contrato base está em `references/contrato_base_vf.docx`.
A skill edita o XML diretamente — nunca recria o docx do zero.

---

## DADOS FIXOS (nunca mudam)

```
CONTRATADA:   VF ENGENHARIA LTDA
CNPJ:         00.000.000/0000-00 (manter como está no template — Vini preenche o definitivo)
Representante: Vinícius Marcos Figueiredo
Cláusulas 2, 3, 6, 8, 9, 10: texto fixo, não alterar
```

---

## CAMPOS VARIÁVEIS

| Campo | Placeholder no XML | Exemplo |
|-------|-------------------|---------|
| Nome do contratante | `[[CONTRATANTE_NOME]]` | CONDOMÍNIO COMPLEXO TURÍSTICO Il CAMPANÁRIO |
| CNPJ do contratante | `[[CONTRATANTE_CNPJ]]` | 00.000.000/0000-00 |
| Endereço do contratante | `[[CONTRATANTE_ENDERECO]]` | Avenida dos Búzios, n.º 1760, Jurerê Internacional, Florianópolis, SC |
| Representante do contratante | `[[CONTRATANTE_REP]]` | Carlos Berenhauser Leite |
| Cargo do representante | `[[CONTRATANTE_CARGO]]` | síndico |
| Área construída | `[[AREA_M2]]` | 44.149,15 m² |
| Itens do escopo (Cláusula 1) | `[[ESCOPO_ITENS]]` | lista de bullets conforme tipo |
| Itens não inclusos (Cláusula 4) | `[[NAO_INCLUSO]]` | prefeitura de Florianópolis... |
| Cidade da prefeitura | `[[CIDADE_PREFEITURA]]` | Florianópolis |
| Valor numérico | `[[VALOR_NUM]]` | 85.000,00 |
| Valor por extenso | `[[VALOR_EXT]]` | oitenta e cinco mil reais |
| Prazo (dias úteis) | `[[PRAZO_DIAS]]` | 30 |
| Cidade da assinatura | `[[CIDADE_ASSINATURA]]` | Florianópolis |
| Data da assinatura | `[[DATA_ASSINATURA]]` | 02 de junho de 2025 |

---

## ESCOPO POR TIPO (Cláusula 1)

Usar os mesmos itens da proposta aprovada. Itens fixos para cada tipo:

**PPCI:**
- Impressão do Projeto em A1 e Memoriais e envio dos arquivos em formato .DWG e PDF;
- Emissão da ART - Anotação de Responsabilidade Técnica emitida por Engenheiro Civil;
- Visitas técnicas à empresa e reunião para entrega do serviço aqui contratado;
- Assessoria para obtenção do Atestado de Regularização junto ao CBMSC;
- Acompanhamento da tramitação dos processos até a sua aprovação pelo sistema e-SCI;
- Elaboração do PPCI seguindo todas as normativas vigentes do CBMSC, bem como com a inclusão de todos os sistemas preventivos necessários para a edificação;
- Emissão de nota fiscal (e-NFs) de todos os serviços prestados.

**RPCI + Habite-se:**
- Emissão da ART - Anotação de Responsabilidade Técnica emitida por Engenheiro Civil;
- Acompanhamento da tramitação do processo até a sua aprovação pelo sistema e-SCI;
- Elaboração do RPCI seguindo todas as normativas vigentes do CBMSC;
- Elaboração de documentação técnica para obtenção do atestado de Habite-se do CBMSC;
- Emissão de nota fiscal (e-NFs) de todos os serviços prestados.

**Habite-se:**
- Emissão da ART - Anotação de Responsabilidade Técnica emitida por Engenheiro Civil;
- Assessoria para obtenção de prorrogação de prazos junto ao CBMSC;
- Elaboração de documentação técnica para obtenção do atestado de Habite-se do CBMSC;
- Acompanhamento da tramitação do processo até a sua aprovação pelo sistema e-SCI;
- Emissão de nota fiscal (e-NFs) de todos os serviços prestados.

---

## PASSO A PASSO

### 1. Verificar se existe proposta aprovada

Perguntar: "Com base em qual proposta? Se já gerou a proposta para esse cliente, posso puxar os dados automaticamente."

Se existir proposta em `propostas/`, ler os dados de lá.
Se não existir, coletar manualmente:

1. Nome completo da empresa contratante
2. CNPJ do contratante
3. Endereço completo do contratante
4. Nome e cargo do representante legal
5. Tipo de serviço (PPCI / RPCI / Habite-se)
6. Área construída em m²
7. Itens extras do escopo (se houver, além dos padrão)
8. Valor (número e por extenso)
9. Percentuais de pagamento (padrão: 30% / 40% / 30% — confirmar)
10. Prazo em dias úteis (padrão: 30)
11. Cidade da assinatura
12. Data da assinatura

### 2. Mostrar resumo para confirmação

Apresentar os dados em lista antes de gerar. Exemplo:
```
Contratante: CONDOMÍNIO IL CAMPANÁRIO
CNPJ: 00.000.000/0000-00
Representante: Carlos Berenhauser Leite (síndico)
Tipo: PPCI
Área: 44.149,15 m²
Valor: R$ 85.000,00 (oitenta e cinco mil reais)
Pagamento: 30% assinatura / 40% protocolo / 30% aprovação
Prazo: 30 dias úteis
Assinatura: Florianópolis, 02 de junho de 2025

Confirma?
```

### 3. Gerar o .docx

Usar `references/gerar_contrato_vf.js`.
Copiar para `/tmp/gerar_contrato_vf_[[cliente_lower]].js`.
Substituir o objeto `d` com os dados confirmados.
Rodar:
```
NODE_PATH=$(npm root -g) node /tmp/gerar_contrato_vf_[[cliente_lower]].js
```
Salvar em: `clientes/ativos/vinicius/contratos/contrato_[[cliente_lower]]_[[data]].docx`

---

## DADOS FIXOS VF ENGENHARIA

```
CONTRATADA: VF ENGENHARIA LTDA
Representante: Vinícius Marcos Figueiredo
Endereço: Rua José de Araújo, 39, Barreiros, São José, SC
Foro: Comarca de Florianópolis, SC
```