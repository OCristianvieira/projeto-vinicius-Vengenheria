# Diagnóstico — Call de Kickoff

**Data:** 29/04/2026
**Participantes:** Cristian Vieira + Vinicius Figueiredo

---

## Ambiente técnico

- Sistema operacional: Windows (Acer Nitro 5)
- Ferramenta atual: Claude.ai via browser (referido como "cork" na call)
- Problema com cork: gasta muitos tokens, especialmente para tarefas com planilha
- Próximo passo: instalar Claude Code

---

## Documentos e modelos existentes

### Proposta
- Tem PDF pronto com estrutura definida
- Vai inserir `[[variavel]]` nos campos que mudam
- Vai compartilhar na pasta do Google Drive

### Termo de aceite
- Tem modelo Word, mas o padrão pode ter se perdido
- Vai recriar com placeholders `[[xx]]`

### Planilha de follow-up (Google Sheets)
Campos mapeados:
- Data do contato (quando foi feita a proposta)
- Nome do cliente
- Telefone
- Data de retorno (data contato +7 dias)
- Fonte do lead (como o cliente chegou)
- Tipo de projeto (laudo, projeto, funcionamento, etc.)
- Valor da proposta

Sistema de cores manual:
- Laranja: contatado / proposta enviada
- Verde: fechado

### Planilha de custos (Google Sheets)
- Tem modelo pronto
- Vai compartilhar na pasta do Google Drive

### Planilha de projetos (Google Sheets)
- Tem modelo pronto
- Vai compartilhar na pasta do Google Drive

---

## Pasta Google Drive

Vinicius vai criar uma pasta no Drive e colocar:
- Modelo de proposta (com placeholders)
- Modelo de termo de aceite (com placeholders)
- Planilha de custos (modelo)
- Planilha de projetos (modelo)
- Planilha de follow-up (modelo)

---

## Fluxo de follow-up atual

1. Vinicius emite proposta para o cliente
2. Preenche manualmente a planilha de follow-up com os dados
3. Olha a planilha a cada 1-2 dias para ver quem precisa de retorno
4. Faz o follow-up pessoalmente via WhatsApp

O que quer automatizar: ao gerar a proposta, o Claude já registra o cliente na planilha de follow-up com data de retorno calculada (+7 dias).

---

## WhatsApp Business

- Foco imediato: apenas primeira mensagem automática de boas-vindas (via WhatsApp Business nativo, sem API)
- Futuramente: atendimento mais avançado com Evolution API + número dedicado
- Futuramente: disparos em massa para lançamentos de workshop

WhatsApp não entra no escopo do Mês 01.

---

## LinkedIn

- Faz tudo 100% manual, gasta cerca de 1 hora por post
- Quer automatizar geração de texto com IA alinhada à sua voz
- Viu o sistema do Cristian (Gemini Agent) e quer algo parecido

Para criar o instalador LinkedIn do Vini, precisamos de:
- Exemplos de posts que ele já publicou (pedir via WhatsApp)
- Ou acesso ao perfil para scrape com Apify

---

## Prioridades definidas na call

1. Vinicius baixa Claude Code
2. Vinicius organiza pasta no Drive com os modelos (hoje)
3. Cristian cria as skills e configura ambiente
4. Marcar call essa semana para testar proposta + termo ao vivo

---

## Nicho e tipo de serviço

Consultoria de engenharia. Serviços mencionados na call:
- Laudo
- Projeto
- Funcionamento

(Confirmar lista completa de serviços com o Vini antes de criar as skills)
