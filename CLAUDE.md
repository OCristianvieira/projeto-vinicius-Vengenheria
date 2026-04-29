# VF Engenharia — Sistema Operacional Claude Code

Você está operando na pasta do Vinicius Marcos Figueiredo, Engenheiro Civil, CREA 198631-4.
Empresa: VF Engenharia — PPCI, RPCI, Habite-se, laudos junto ao CBMSC.

---

## Setup — o que precisa estar instalado

### Node.js
Necessário para gerar os documentos (.docx e .pptx) e conectar com o Google Sheets.
Baixar em: https://nodejs.org (versão LTS)

Verificar se está instalado:
```
node -v
```

### Pacotes Node
Com Node instalado, rodar no terminal:
```
npm install -g docx pptxgenjs googleapis dotenv
```

Verificar onde foram instalados:
```
npm root -g
```
Guardar esse caminho — vai ser usado nos scripts.

### Imagens de referência
A pasta `recursos/templates/` precisa conter:
- `capa_wide.png` — foto de capa da proposta com banner "PROPOSTA DE SERVIÇO"
- `logo_vf.jpg` — logo VF Engenharia

Esses arquivos já estão na pasta. Se sumirem, extrair dos PDFs originais em `recursos/templates/*.pdf`.

---

## Conectar Google Sheets (follow-up automático)

Para a skill `/followup-vinicius` funcionar, é preciso criar credenciais de acesso à planilha.
Fazer isso uma única vez.

### Passo 1 — Criar projeto no Google Cloud

1. Acessar https://console.cloud.google.com
2. Clicar em "Novo projeto" — nomear "VF Engenharia"
3. Com o projeto selecionado, ir em "APIs e serviços" > "Biblioteca"
4. Buscar "Google Sheets API" e clicar em "Ativar"

### Passo 2 — Criar Service Account

1. Ir em "APIs e serviços" > "Credenciais"
2. Clicar em "Criar credenciais" > "Conta de serviço"
3. Nome: `vf-sheets` — clicar em "Criar e continuar" > "Concluir"
4. Clicar na conta de serviço criada
5. Ir na aba "Chaves" > "Adicionar chave" > "Criar nova chave" > JSON
6. O arquivo JSON vai baixar automaticamente — guardar bem

### Passo 3 — Compartilhar a planilha

1. Abrir o arquivo JSON baixado e copiar o campo `client_email`
   (parece com: `vf-sheets@vf-engenharia.iam.gserviceaccount.com`)
2. Abrir a planilha de follow-up no Google Sheets
3. Clicar em "Compartilhar" e colar o e-mail do service account
4. Dar permissão de **Editor**

### Passo 4 — Pegar o ID da planilha

Na URL da planilha:
```
https://docs.google.com/spreadsheets/d/ESTE_É_O_ID/edit
```
Copiar o trecho entre `/d/` e `/edit`.

### Passo 5 — Criar o arquivo .env

Na pasta raiz do projeto (mesma pasta onde está este CLAUDE.md), criar o arquivo `.env`:

```
GOOGLE_SHEET_ID=colar_o_id_da_planilha_aqui
GOOGLE_SERVICE_ACCOUNT_EMAIL=colar_o_client_email_do_json_aqui
GOOGLE_PRIVATE_KEY=colar_a_private_key_do_json_aqui
```

A `private_key` fica dentro do JSON baixado — é o campo `"private_key"`, começa com `-----BEGIN RSA PRIVATE KEY-----`.

**Importante:** o arquivo `.env` nunca deve ser compartilhado ou enviado para ninguém.

### Verificar se funcionou

Depois de criar o `.env`, testar rodando:
```
node skills/followup-vinicius/references/inserir_followup.js
```

Se aparecer "Lead registrado na planilha", está funcionando.

---

## Skills disponíveis

| Skill | Como acionar | O que faz |
|-------|-------------|-----------|
| `/proposta-vinicius` | "gerar proposta", "proposta para [cliente]", "PPCI para [empresa]" | Coleta dados, preenche template, gera .docx e .pptx |
| `/contrato-vinicius` | "gerar contrato", "contrato para [cliente]" | Preenche contrato base com dados do cliente, gera .docx |
| `/followup-vinicius` | "registra no follow-up", "anota o lead", "follow-up do [cliente]" | Insere linha na planilha Google Sheets automaticamente |

---

## Onde ficam os arquivos

```
vinicius/
├── CLAUDE.md                        ← você está aqui
├── .env                             ← credenciais Google (criar conforme setup acima)
├── propostas/                       ← .docx e .pptx gerados
├── contratos/                       ← contratos .docx gerados
├── recursos/
│   └── templates/
│       ├── capa_wide.png            ← imagem de capa da proposta
│       ├── logo_vf.jpg              ← logo VF Engenharia
│       ├── contrato_base_vf.docx    ← contrato modelo original
│       └── *.pdf                    ← modelos originais de proposta
└── skills/
    ├── proposta-vinicius/
    │   ├── SKILL.md
    │   └── references/
    │       ├── tipos_proposta.md
    │       ├── gerar_docx_vf.js
    │       └── gerar_pptx_vf.js
    ├── contrato-vinicius/
    │   ├── SKILL.md
    │   └── references/
    │       └── gerar_contrato_vf.js
    └── followup-vinicius/
        ├── SKILL.md
        └── references/
            └── inserir_followup.js
```

---

## Se o Node não encontrar os pacotes

Rodar no terminal para descobrir o caminho exato:
```
npm root -g
```

Editar a linha `modulePath` no início dos scripts:
```javascript
const modulePath = 'COLAR_O_CAMINHO_AQUI';
```

---

## Dados fixos VF Engenharia

```
Engenheiro: Vinicius Marcos Figueiredo
CREA: 198631-4
Endereço: Rua José de Araújo, 39 — Barreiros, São José/SC
Telefone: (48) 98874-9269
E-mail: contato@vf-engenharia.com
Site: www.vf-engenharia.com
Validade da proposta: 15 dias
```
