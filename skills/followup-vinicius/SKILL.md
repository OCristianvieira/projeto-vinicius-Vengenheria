---
name: followup-vinicius
description: >
  Registra um lead na planilha de follow-up do Vinicius no Google Sheets.
  Colunas: Data, Nome, Telefone, Retorno (+7 dias), Fonte, Detalhes, Obs.
  Use SEMPRE QUE Vinicius mencionar "registra no follow-up", "anota o lead",
  "preenche o follow-up", "registra na planilha", "follow-up do cliente",
  "anotou no CRM" ou qualquer variação.
argument-hint: "[nome] [telefone] [fonte] [tipo-servico] [valor]"
---

# Follow-up VF Engenharia

Registra leads na planilha Google Sheets do Vinicius após envio de proposta.

**Pré-requisito:** arquivo `.env` na pasta do cliente com as credenciais Google.
Se não existir, seguir o setup em `CLAUDE.md` antes de continuar.

---

## COLUNAS DA PLANILHA

| Coluna | Campo | Observação |
|--------|-------|------------|
| A | Data | Data do contato (hoje) — formato DD/MM |
| B | Nome | Nome do cliente/empresa |
| C | Telefone | Com DDD |
| D | Retorno | Data de hoje + 7 dias — formato DD/MM |
| E | Fonte | Como chegou: trafego google, wagner, vinicius, cliente recorrente... |
| F | Detalhes | Tipo de serviço + valor. Ex: "PPCI 8500 reais" |
| G | Obs | Observação livre (opcional) |

---

## DADOS A COLETAR

Se não fornecidos, perguntar:

1. Nome do cliente/empresa
2. Telefone (com DDD)
3. Fonte do lead (trafego google / indicação wagner / indicação vinicius / cliente recorrente / outro)
4. Tipo de serviço e valor — se proposta já foi gerada, puxar automaticamente
5. Observação (opcional — ex: "pediu para chamar fevereiro")

---

## PASSO A PASSO

### 1. Coletar dados

### 2. Calcular datas

- Data: hoje no formato DD/MM
- Retorno: hoje + 7 dias no formato DD/MM

### 3. Mostrar linha para confirmar

```
Data:     29/04
Nome:     Construtora Horizonte Ltda
Telefone: (48) 99821-4477
Retorno:  06/05
Fonte:    trafego google
Detalhes: PPCI 8500 reais
Obs:      —

Confirma?
```

### 4. Inserir na planilha

Usar `references/inserir_followup.js`.
Copiar para `/tmp/inserir_followup_vf.js` se necessário.
Rodar:
```
node references/inserir_followup.js
```

O script lê o `.env` da pasta do cliente, autentica e appenda a linha na aba "Follow up".

---

## VERIFICAR SE .env EXISTE

Antes de rodar, checar se `.env` existe na pasta do cliente:
```
cat clientes/ativos/vinicius/.env
```

Se não existir: parar e orientar o Vinicius a seguir o setup em `CLAUDE.md` seção "Conectar Google Sheets".