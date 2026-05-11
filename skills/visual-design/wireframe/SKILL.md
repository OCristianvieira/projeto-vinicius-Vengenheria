---
name: wireframe
description: Cria wireframes ASCII art antes de escrever qualquer código. Use quando o usuário pedir para criar uma UI, dashboard, landing page, slide deck, banco de dados ou qualquer estrutura visual. Palavra-chave: "wireframe", "visualizar", "blueprint", "antes de codar", "esquema visual".
argument-hint: [o que visualizar]
---

# Skill: Wireframe ASCII Art

Você é um especialista em criar blueprints visuais usando ASCII art antes de escrever qualquer código. Sua missão é ajudar o usuário a planejar e alinhar a estrutura visual de qualquer coisa antes de executar.

## Princípio central

**Nunca escreva código antes de criar e aprovar o wireframe.** O wireframe é o contrato visual entre você e o usuário.

Vibe coding sem planejamento = iterações desnecessárias, tokens desperdiçados, código morto acumulado.

## Quando usar esta abordagem

- Landing pages e sites
- Dashboards e painéis analíticos
- Apps e interfaces de usuário
- Slide decks e apresentações
- Esquemas de banco de dados (tabelas e relacionamentos)
- Qualquer estrutura que precise de alinhamento visual antes da execução

## Fluxo obrigatório

### Passo 1: Criar o wireframe ASCII

Antes de qualquer código, gere o wireframe com ASCII art usando caracteres normais:
`┌ ┐ └ ┘ │ ─ ┼ ┬ ┴ ├ ┤` ou versão simples com `+ - | =`

**Apresente o wireframe e PARE. Aguarde feedback.**

Diga explicitamente: *"Este é o blueprint. Faça suas alterações antes de eu escrever qualquer código."*

### Passo 2: Iterar no wireframe (não no código)

Aceite mudanças estruturais, de layout, de seções. Redesenhe o wireframe. Continuar iterando até aprovação.

Iterações no wireframe custam zero tokens comparado a reescrever código.

### Passo 3: Construir com o wireframe como especificação

Só então escreva: *"Vou construir isso usando o wireframe como especificação exata."*

## Templates por tipo de artefato

### Landing Page
```
┌─────────────────────────────────────────┐
│  LOGO          Nav Links    [CTA Button] │  ← Navbar
├─────────────────────────────────────────┤
│                                         │
│      Headline Principal                 │  ← Hero
│      Subheadline de apoio               │
│      [Screenshot/Imagem]                │
│      [Botão CTA]                        │
│                                         │
├─────────────────────────────────────────┤
│  Logo1  Logo2  Logo3  Logo4  Logo5      │  ← Social Proof
├─────────────────────────────────────────┤
│  [Icon] Feature 1  [Icon] Feature 2     │  ← Features
│  [Icon] Feature 3  [Icon] Feature 4     │
├─────────────────────────────────────────┤
│  Free     │    Pro      │  Enterprise   │  ← Pricing
│  $0/mo    │   $29/mo    │   Custom      │
│  [Btn]    │   [Btn]     │   [Btn]       │
├─────────────────────────────────────────┤
│  Links    │  Links      │  Social       │  ← Footer
└─────────────────────────────────────────┘
```

### Dashboard SaaS
```
┌──────────┬────────────────────────────────┐
│          │  [Stat 1]  [Stat 2]  [Stat 3]  │  ← Summary
│ Sidebar  ├────────────────────────────────┤
│          │  [Line Chart ──────] [Pie  ]   │  ← Charts
│ > Home   │                                │
│ > Dash   ├────────────────────────────────┤
│ > Config │  Data Table                    │  ← Table
│          │  Col1  Col2  Col3  Status      │
└──────────┴────────────────────────────────┘
```

### Slide Deck (cada slide = caixa)
```
┌─[Slide 1: Título]──────────────┐  ┌─[Slide 2: Problema]────────────┐
│                                │  │                                 │
│     Título Principal           │  │  • Ponto 1                      │
│     Subtítulo                  │  │  • Ponto 2                      │
│     [Logo]                     │  │  • Ponto 3                      │
└────────────────────────────────┘  └─────────────────────────────────┘
```

### Banco de Dados (tabelas e relacionamentos)
```
┌─────────────┐       ┌──────────────┐
│   USERS     │       │  PRODUCTS    │
│─────────────│       │──────────────│
│ PK: id      │──┐    │ PK: id       │
│ name        │  │    │ name         │
│ email       │  │    │ price        │
│ created_at  │  │    │ user_id (FK) │──┐
└─────────────┘  │    └──────────────┘  │
                 │                      │
                 └──────────────────────┘
                        1 para N
```

## Regras de qualidade do wireframe

1. **Mostre hierarquia visual** — elementos maiores/mais importantes ficam mais proeminentes
2. **Use anotações** — adicione `← descrição` ao lado de seções
3. **Seja específico** — escreva texto real ("Headline Principal") não placeholders genéricos ("texto aqui")
4. **Mostre relacionamentos** — use setas e linhas para conectar elementos relacionados
5. **Inclua interatividade** — indique botões com `[Botão]`, inputs com `[_____]`

## Dicas para economizar tokens

- Para **slides**: wireframe salva muitos tokens porque slides são token-intensivos. Aprove tudo antes de construir.
- Para **bancos de dados**: visualize os relacionamentos antes de gerar SQL — evita suposições erradas sobre FKs.
- Para **dashboards**: itere no layout antes de criar componentes que precisarão ser reescritos.

## Exemplo de interação ideal

**Usuário:** Cria um dashboard de analytics para meu SaaS

**Você:**
1. Gera wireframe ASCII completo
2. Diz: "Este é o blueprint. Quais mudanças antes de eu codar?"
3. Aguarda feedback
4. Itera no wireframe se necessário
5. Constrói somente após aprovação explícita

## $ARGUMENTS

$ARGUMENTS
