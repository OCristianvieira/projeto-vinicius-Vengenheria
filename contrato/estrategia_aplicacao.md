# Estratégia de Aplicação — Mentoria Vinicius

**Criado:** 28/04/2026

---

## Insight principal

Não precisamos gravar 8 vídeos ensinando processo manual. O Claude executa todos os 8 processos diretamente. O tutorial ensina o Vinicius a operar o Claude Code — não a fazer a tarefa na mão.

---

## O que o Claude faz em cada demanda

| # | Demanda | Como o Claude executa |
|---|---------|----------------------|
| 1 | Montar proposta | Skill de proposta (já existe na Styem) |
| 2 | Montar termo de aceite | Prompt direto, Claude gera o documento |
| 3 | Preencher planilha de custos | Claude lê os dados e preenche via script |
| 4 | Preencher planilha de projetos | Idem |
| 5 | Preencher planilha de follow-up | Claude organiza e popula |
| 6 | Responder business / recepção | Claude escreve as respostas com template |
| 7 | Follow-up +7 dias | Claude gera mensagem no tom certo |
| 8 | Cobrar clientes na entrega | Claude gera mensagem de cobrança |

---

## Abordagem em tempo record

**Kickoff (Dia 1)**
Instalar Claude Code e fazer ao vivo os itens 1 e 2 (proposta + termo de aceite). Ele vê o resultado funcionando no primeiro dia.

**Semana 1**
Criar as skills e prompts para os 8 casos com base no que o Vinicius já usa hoje (templates, planilhas, modelos de mensagem).

**Semana 2**
Gravar os tutoriais mostrando o Claude em ação — não o processo manual.

---

## Perguntas para a call de diagnóstico

O objetivo é entender o que ele já tem para não partir do zero em nada.

### Sobre processos existentes
- Tem proposta modelo? Em que formato (Word, Google Docs, Notion)?
- Tem termo de aceite pronto ou cria do zero toda vez?
- Tem planilhas de custos/projetos/follow-up? Onde ficam (Excel, Google Sheets)?
- Como responde o WhatsApp Business hoje? Tem algum roteiro ou é improvisado?
- Tem algum modelo de mensagem de follow-up ou cobrança?

### Sobre volume e frequência
- Quantas propostas emite por mês?
- Quantos leads entram por semana no WhatsApp Business?
- Quantos projetos ativos roda em paralelo?

### Sobre tecnologia atual
- Usa alguma ferramenta de automação hoje (Zapier, Make, n8n)?
- Tem CRM ou gerencia leads em planilha mesmo?
- Mac ou Windows? (para o setup do Claude Code)
- Tem conta na Anthropic ou precisa criar?

### Sobre o agente
- Qual tarefa mais travada operacionalmente que ele quer resolver primeiro?
- Tem algum processo que repete toda semana e odeia fazer?

---

## Respostas do diagnóstico (call 29/04/2026)

| Pergunta | Resposta |
|---------|---------|
| Mac ou Windows? | Windows (Acer Nitro 5) |
| Tem proposta modelo? | Sim, PDF pronto. Vai inserir `[[variavel]]` nos campos e compartilhar no Drive |
| Tem termo de aceite? | Sim, modelo Word. Pode ter se perdido o padrão, vai recriar com placeholders |
| Tem planilhas? | Google Sheets para follow-up, custos e projetos. Vai compartilhar na pasta do Drive |
| Qual tarefa mais travada? | Preencher proposta + registrar no follow-up manualmente |
| Usa automação hoje? | Não. Tentou com claude.ai (cork) mas gastou muito token |
| Tem conta Anthropic? | Sim (usa claude.ai) |
| Quantas propostas por mês? | Não mapeado ainda |
| Leads por semana no WhatsApp? | Não mapeado ainda |

---

## Status

- [x] Call de diagnóstico realizada (29/04/2026)
- [x] Respostas do diagnóstico documentadas
- [x] Skills a criar mapeadas (ver MAP.md)
- [x] Kickoff realizado
