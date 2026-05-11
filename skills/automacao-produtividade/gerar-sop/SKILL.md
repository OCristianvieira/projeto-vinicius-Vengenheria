---
name: gerar-sop
description: >
  Gera SOPs (Procedimentos Operacionais Padrão) estruturados a partir de descrição livre ou análise de projeto de cliente.
  Use esta skill sempre que o usuário mencionar "SOP", "processo", "procedimento", "documentar processo", "criar SOP",
  "quero documentar", "isso fica só na minha cabeça", "como eu faço X", "analisa o projeto e sugere SOPs",
  ou pedir para transformar texto informal em processo estruturado.
  Salva automaticamente o SOP como .docx na pasta do cliente em /clientes/<cliente>/sops/.
---

# Skill: Gerar SOP

Você é um especialista em processos operacionais. Sua função é transformar descrições informais em SOPs estruturados e salvá-los como documentos Word na pasta do cliente.

## DOIS MODOS DE OPERAÇÃO

---

### MODO 1 — INPUT LIVRE
**Quando usar:** O usuário descreve um processo em linguagem natural ou texto informal.

**Fluxo:**
1. Identifique o nome do processo e o cliente (pergunte se não estiver claro)
2. Estruture o SOP com as etapas abaixo
3. Mostre o SOP formatado no chat para aprovação
4. Após aprovação, gere o `.docx` e salve em `/home/cristian/Área de trabalho/Styem para o claude/clientes/<cliente>/sops/<nome_processo>.docx`

---

### MODO 2 — ANÁLISE DE PROJETO
**Quando usar:** O usuário pede "analisa o projeto X e sugere SOPs" ou similar.

**Fluxo:**
1. Identifique o cliente
2. Leia todos os arquivos relevantes da pasta `/home/cristian/Área de trabalho/Styem para o claude/clientes/<cliente>/`
3. Liste os **melhores candidatos a SOP** — processos recorrentes, entregas padrão, fluxos de aprovação, onboardings, relatórios
4. Apresente a lista numerada para o usuário aprovar quais quer criar
5. Para cada aprovado: gere o SOP completo e salve o `.docx` separado em `/clientes/<cliente>/sops/`

---

## ESTRUTURA DO SOP

Para cada SOP, use este formato:

```
# SOP — [NOME DO PROCESSO]

**Cliente:** [nome]
**Responsável geral:** [quem executa]
**Gatilho:** [o que dispara esse processo]
**Data de criação:** [data atual]

---

## ETAPA 01 — [Nome da etapa]
- **Responsável:**
- **Prazo:**
- **Ação:**
- **Critério de conclusão:**
- **⚠️ Ponto de atenção:** (quando aplicável)

## ETAPA 02 — [Nome da etapa]
...

---

## ENTREGÁVEL FINAL
[O que existe ao final do processo completo]

## PONTOS CRÍTICOS
[Lista dos 2-3 pontos onde o processo mais falha]
```

---

## CRIAÇÃO DO .DOCX

Use `docx` (npm package) via JavaScript para criar o arquivo Word.

**Padrão visual do documento:**
- Fonte: Arial
- Cor de destaque: #1A1A1A (títulos) e #E8673A (badges de etapa)
- Cada etapa em bloco com borda lateral esquerda laranja
- Cabeçalho: nome do processo + nome do cliente + data
- Rodapé: "Styem · [data] · Documento confidencial"

**Script base:**

```javascript
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, HeadingLevel, AlignmentType, BorderStyle, WidthType,
        ShadingType, PageNumber, LevelFormat } = require('docx');
const fs = require('fs');

// Cria pasta sops se não existir
const sopDir = '/home/cristian/Área de trabalho/Styem para o claude/clientes/CLIENTE/sops';
if (!fs.existsSync(sopDir)) fs.mkdirSync(sopDir, { recursive: true });

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: "1A1A1A" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "E8673A" },
        paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 1,
          border: { left: { style: BorderStyle.THICK, size: 12, color: "E8673A", space: 10 } } } },
    ]
  },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 } } },
    headers: { default: new Header({ children: [new Paragraph({
      children: [
        new TextRun({ text: "SOP — NOME DO PROCESSO", bold: true, font: "Arial", size: 20, color: "1A1A1A" }),
        new TextRun({ text: "   |   Cliente: CLIENTE", font: "Arial", size: 18, color: "777777" }),
      ]
    })] }) },
    footers: { default: new Footer({ children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Styem · DATA · Documento confidencial", font: "Arial", size: 16, color: "999999" })]
    })] }) },
    children: [
      // Título principal
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("SOP — NOME DO PROCESSO")] }),
      new Paragraph({ children: [new TextRun({ text: "Cliente: CLIENTE   |   Responsável: RESPONSAVEL   |   Data: DATA", size: 20, color: "555555" })] }),
      new Paragraph({ children: [new TextRun("")] }),

      // Bloco de gatilho
      new Paragraph({ children: [new TextRun({ text: "GATILHO: ", bold: true }), new TextRun("GATILHO_TEXTO")] }),
      new Paragraph({ children: [new TextRun("")] }),

      // Etapas (repetir para cada etapa)
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("ETAPA 01 — NOME")] }),
      new Paragraph({ children: [new TextRun({ text: "Responsável: ", bold: true }), new TextRun("...")] }),
      new Paragraph({ children: [new TextRun({ text: "Prazo: ", bold: true }), new TextRun("...")] }),
      new Paragraph({ children: [new TextRun({ text: "Ação: ", bold: true }), new TextRun("...")] }),
      new Paragraph({ children: [new TextRun({ text: "Critério de conclusão: ", bold: true }), new TextRun("...")] }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(`${sopDir}/NOME_PROCESSO.docx`, buffer);
  console.log('SOP salvo com sucesso.');
});
```

**Antes de gerar:** verifique se `docx` está instalado com `npm list -g docx`. Se não, rode `npm install -g docx`.

---

## REGRAS

- Sempre mostrar o SOP no chat antes de gerar o arquivo — nunca gerar sem aprovação
- Pasta do cliente deve existir em `/clientes/`. Se não existir, pergunte ao usuário
- Subpasta `sops/` deve ser criada automaticamente se não existir
- Nome do arquivo: snake_case do nome do processo. Ex: `onboarding_cliente.docx`
- Cada SOP em arquivo separado — nunca juntar múltiplos SOPs em um único doc
- Data sempre no formato DD/MM/YYYY
