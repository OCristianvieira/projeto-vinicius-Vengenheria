const path = require('path');
const fs   = require('fs');
const mod  = process.env.NODE_PATH || require('child_process').execSync('npm root -g').toString().trim();
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ImageRun,
  WpsShapeRun,
  Table,
  TableRow,
  TableCell,
  Footer,
  AlignmentType,
  LevelFormat,
  BorderStyle,
  TabStopType,
  WidthType,
  ShadingType,
  SectionType,
  HorizontalPositionRelativeFrom,
  HorizontalPositionAlign,
  VerticalPositionRelativeFrom,
  VerticalPositionAlign,
  TextWrappingType,
} = require(path.join(mod, 'docx'));

const d = {
  tipo:      'PPCI',
  cliente:   'Construtora Horizonte Ltda',
  contato:   '(48) 99821-4477',
  area_m2:   '3.240,00',
  cidade:    'São José',
  tabela:    '3',
  divisoes:  'C-1, C-2',
  altura:    '12,00',
  valor_num: '8.500,00',
  valor_ext: 'oito mil e quinhentos reais',
  data_dia:  '29',
  data_mes:  'abril',
  data_ano:  '2026',
  saida:     '/tmp/proposta_horizonte_v2_full_bleed.docx',
};

const RES  = '/Users/cristianmacos/styem primario/clientes/ativos/vinicius/recursos/templates';
const DARK = '1A1A1A';
const GRAY = '666666';

// A4 em Word: 8.27in x 11.69in. O pacote docx interpreta transformation em px.
// 794px equivale a 8.27in em 96dpi, preenchendo a largura inteira da página.
const PAGE_W = 794;
const CAPA_H = 286; // proporção de capa_foto.jpg: 1655x596, igual ao exemplo do Canva
const EMU = 9525;

const MAR_L = 1134;
const MAR_R = 1134;
const MAR_T = 0;
const MAR_B = 720;
const CONTENT_W = 9638; // A4 - margens laterais
const GREEN = '6FE24D';

const S = (text, opts={}) => new TextRun({ text, font: 'Arial', size: 20, color: DARK, ...opts });
const esp = (before=0, after=120) => new Paragraph({ spacing:{before,after}, children:[new TextRun('')] });

function titulo(text) {
  return new Paragraph({
    spacing: { before: 285, after: 105 },
    children: [S(text, { bold:true, size:23, allCaps:true })],
  });
}

function corpo(text, justify=true) {
  return new Paragraph({
    alignment: justify ? AlignmentType.JUSTIFIED : AlignmentType.LEFT,
    spacing: { before: 0, after: 75 },
    children: [S(text)],
  });
}

function blt(text) {
  return new Paragraph({
    numbering: { reference: 'blt', level: 0 },
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 23, after: 23 },
    children: [S(text)],
  });
}

function campo(label, valor) {
  return new Paragraph({
    spacing: { before: 45, after: 45 },
    children: [
      S(label+'  ', { bold:true, size:21 }),
      S(valor),
    ],
  });
}

const capaData = fs.readFileSync(path.join(RES, 'capa_foto.jpg'));
const logoData = fs.readFileSync(path.join(RES, 'logo_vf.jpg'));

function floatingTopImage(data, width, height, name, type='jpg') {
  return new ImageRun({
    type,
    data,
    transformation: { width, height },
    floating: {
      horizontalPosition: {
        relative: HorizontalPositionRelativeFrom.PAGE,
        align: HorizontalPositionAlign.LEFT,
      },
      verticalPosition: {
        relative: VerticalPositionRelativeFrom.PAGE,
        align: VerticalPositionAlign.TOP,
      },
      wrap: { type: TextWrappingType.NONE },
      allowOverlap: true,
      behindDocument: false,
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    altText: { title: name, description: name, name },
  });
}

function bannerTitulo() {
  const borderNone = {
    top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  };
  return new Table({
    alignment: AlignmentType.CENTER,
    width: { size: 6900, type: WidthType.DXA },
    columnWidths: [6900],
    borders: borderNone,
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: 6900, type: WidthType.DXA },
        borders: borderNone,
        shading: { fill: DARK, type: ShadingType.CLEAR },
        margins: { top: 140, bottom: 140, left: 240, right: 240 },
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 0 },
          children: [new TextRun({
            text: 'PROPOSTA DE SERVIÇO',
            font: 'Arial',
            bold: true,
            size: 36,
            color: GREEN,
          })],
        })],
      })],
    })],
  });
}

function coverTitleOverlay() {
  return new WpsShapeRun({
    type: 'wps',
    transformation: { width: 493, height: 58 },
    floating: {
      horizontalPosition: {
        relative: HorizontalPositionRelativeFrom.PAGE,
        offset: 150 * EMU,
      },
      verticalPosition: {
        relative: VerticalPositionRelativeFrom.PAGE,
        offset: 117 * EMU,
      },
      wrap: { type: TextWrappingType.NONE },
      allowOverlap: true,
      behindDocument: false,
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
    },
    solidFill: { type: 'solidFill', solidFillType: 'rgb', value: DARK },
    outline: { type: 'noFill' },
    altText: { title: 'titulo_capa', description: 'Titulo centralizado da capa', name: 'titulo_capa' },
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 110, after: 0 },
      children: [new TextRun({
        text: 'PROPOSTA DE SERVIÇO',
        font: 'Arial',
        bold: true,
        size: 40,
        color: GREEN,
      })],
    })],
  });
}

function footer({ validade=false }={}) {
  const borderNone = {
    top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  };
  return new Footer({
    children: [
      new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 2, color: 'DDDDDD', space: 6 } },
        spacing: { before: 0, after: 80 },
        children: [new TextRun('')],
      }),
      new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: validade ? [1450, 5400, 2788] : [1450, 8188],
        borders: borderNone,
        rows: [new TableRow({
          children: [
            new TableCell({
              width: { size: 1450, type: WidthType.DXA },
              borders: borderNone,
              margins: { top: 0, bottom: 0, left: 0, right: 120 },
              children: [new Paragraph({
                spacing: { before: 0, after: 0 },
                children: [new ImageRun({
                  type:'jpg',
                  data:logoData,
                  transformation:{width:92,height:58},
                  altText:{title:'VF',description:'Logo',name:'logo'},
                })],
              })],
            }),
            new TableCell({
              width: { size: validade ? 5400 : 8188, type: WidthType.DXA },
              borders: borderNone,
              margins: { top: 0, bottom: 0, left: 0, right: 120 },
              children: [
                new Paragraph({
                  spacing: { before: 0, after: 24 },
                  children: [S('Endereço: Rua José de Araújo, 39.', { size:17, color:GRAY })],
                }),
                new Paragraph({
                  spacing: { before: 0, after: 24 },
                  children: [S('Barreiros - São José.', { size:17, color:GRAY })],
                }),
                new Paragraph({
                  spacing: { before: 0, after: 24 },
                  children: [S('Contato: (48) 98874-9269', { size:17, color:GRAY })],
                }),
                new Paragraph({
                  spacing: { before: 0, after: 24 },
                  children: [S('E-mail: contato@vf-engenharia.com', { size:17, color:GRAY })],
                }),
                new Paragraph({
                  spacing: { before: 0, after: 0 },
                  children: [S('Site: www.vf-engenharia.com', { size:17, color:GRAY })],
                }),
              ],
            }),
            ...(validade ? [new TableCell({
              width: { size: 2788, type: WidthType.DXA },
              borders: borderNone,
              margins: { top: 860, bottom: 0, left: 120, right: 0 },
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  spacing: { before: 0, after: 26 },
                  children: [S('Proposta válida por 15 dias.', { bold:true, size:18 })],
                }),
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  spacing: { before: 0, after: 0 },
                  children: [S(`São José, ${d.data_dia} de ${d.data_mes} de ${d.data_ano}.`, { size:18 })],
                }),
              ],
            })] : []),
          ],
        })],
      }),
    ],
  });
}

const page1 = [
  new Paragraph({
    spacing: { before:0, after:0 },
    children: [
      floatingTopImage(capaData, PAGE_W, CAPA_H, 'capa_full_bleed'),
      coverTitleOverlay(),
    ],
  }),
  // Espaçador: a imagem flutuante não ocupa fluxo de texto, então reservamos a altura manualmente.
  esp(0, 3890),

  campo('CLIENTE:', d.cliente),
  campo('CONTATO:', d.contato),
  esp(0, 40),

  titulo('Descrição dos Serviços'),
  corpo(`Prestação de serviços de ELABORAÇÃO E APROVAÇÃO de Projeto Preventivo Contra Incêndio (PPCI) junto ao Corpo de Bombeiros Militar de Santa Catarina. Edificação com aproximadamente ${d.area_m2} m² de área construída em ${d.cidade}.`),
  esp(0, 40),

  titulo('Incluso na Proposta'),
  blt('Impressão do Projeto em A1 e Memoriais e envio dos arquivos em formato .DWG e PDF;'),
  blt('Emissão da ART - Anotação de Responsabilidade Técnica emitida por Engenheiro Civil;'),
  blt('Visitas técnicas à empresa e reunião para entrega do serviço;'),
  blt('Assessoria para obtenção de prorrogação de prazos (autos de fiscalização) junto ao CBMSC;'),
  blt('Acompanhamento da tramitação do processo até a sua aprovação pelo sistema e-SCI;'),
  blt('Elaboração do PPCI seguindo todas as normativas vigentes do CBMSC, bem como com a inclusão de todos os sistemas preventivos necessários para a edificação;'),
  blt('Nota fiscal (e-NFs) de todos os serviços prestados.'),
  esp(0, 40),

  titulo('Sistemas Preventivos Previstos para a Edificação'),
  corpo(`TABELA ${d.tabela} - DIVISÕES DO GRUPO ${d.divisoes} COM ÁREA ≥ 750 m² OU ALTURA ≥ ${d.altura} m`, false),
  blt('Sistema preventivo por extintores;'),
  blt('Sistema hidráulico preventivo;'),
  blt('Instalações de gás combustível (se instalado);'),
  blt('Saídas de emergência;'),
  blt('Sistema de iluminação de emergência;'),
  blt('Sinalização de abandono do local;'),
  blt('Instalação elétrica de baixa tensão;'),
  blt('Sistema de alarme e detecção de incêndio;'),
  blt('Proteção estrutural (TRRF).'),
  esp(0, 80),

  titulo('Prazo para Entrega'),
  corpo('30 (trinta) dias a partir da assinatura do termo de aceite e pagamento do valor da entrada.'),
];

const page2 = [
  bannerTitulo(),
  esp(150, 300),

  titulo('Não Está Incluso'),
  blt('Taxa de análise de Projeto do Corpo de Bombeiros Militar de SC;'),
  blt('Documentos para aprovação na prefeitura (EIV, EIPGV, Licenças Ambientais, Projetos hidrossanitário e elétrico);'),
  blt('Alterações realizadas após a aprovação do projeto.'),
  esp(0, 40),

  titulo('Valor do Serviço e Forma de Pagamento'),
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before:0, after:80 },
    children: [
      S(`R$ ${d.valor_num} (${d.valor_ext}) `, { bold:true }),
      S('nas seguintes formas de pagamento:'),
    ],
  }),
  corpo('⅓ do valor quando da assinatura do contrato para o início dos serviços;'),
  corpo('⅓ quando o PPCI estiver protocolado no Corpo de Bombeiros;'),
  corpo('⅓ quando o PPCI estiver aprovado no Corpo de Bombeiros.'),
  esp(0, 40),

  titulo('Responsabilidade Técnica'),
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before:0, after:80 },
    children: [
      S('Todos os serviços são acompanhados pelo Engenheiro Civil '),
      S('Vinicius Marcos Figueiredo', { bold:true, italics:true }),
      S(', CREA 198631-4. Profissional com comprovada experiência na área, formado pela Universidade Federal de Santa Catarina (UFSC).'),
    ],
  }),
  esp(0, 40),

  titulo('Acervo Técnico - Projetos Aprovados pela VF Engenharia'),
  blt('Il Campanário Vilaggio Resort - Hotel - Florianópolis - 44.149,15 m²;'),
  blt('Jurerê Beach Village - Hotel - Florianópolis - 21.655,39 m²;'),
  blt('FIESC - Federação das Indústrias de SC - Escritórios - Florianópolis - 15.685,50 m²;'),
  blt('Frumar Frutos do Mar - Indústria - Tijucas - 7.527,13 m²;'),
  blt('Paróquia Senhor Bom Jesus de Nazaré - Igreja - Palhoça - 6.971,41 m²;'),
  blt('Galpões Tornado Log (Proprietário: Bild Engenharia) - Galpão Logístico - Biguaçu - 7.119,25 m²;'),
  blt('Mercofar Distribuidora, Importadora e Exp. de Autopeças - Indústria - Biguaçu - 4.273,04 m²;'),
  blt('FAPEU (UFSC) - Educacional - Florianópolis - 2.778,00 m²;'),
  blt('Comércio de Madeiras Sorocaba - Indústria - Biguaçu - 2.095,38 m²;'),
  blt('Techsail Indústria e Comércio de Produtos Químicos - Indústria - Jaraguá do Sul - 1.224,91 m²;'),
  blt('SESI - Serviço Social da Indústria - Clínica Ambulatorial - Chapecó - 2.290,85 m²;'),
  blt('Centro de Eventos Coan (Antigo Petry) - Boate - Biguaçu - 3.548,15 m²;'),
  blt('Mega Jet Comércio e Representação - Comércio - São José - 1.339,79 m²;'),
  blt('Residencial Solar Manacor - Edifício Multifamiliar - Florianópolis - 4.217,93 m²;'),
  blt('Igreja Matriz São João Batista - Igreja - Biguaçu - 1.982,40 m²;'),
  blt('Residencial Gran Vitta Palmas - Edifício Multifamiliar - Governador Celso Ramos - 589,63 m²;'),
  blt('Agora Sou Mãe - Indústria - São José - 879,85 m²;'),
  blt('Associação de Praças do Estado de Santa Catarina - Escritórios Administrativos - Florianópolis - 284,86 m²;'),
  blt('Academia Gerber - Espaço para atividade física - Biguaçu - 1.840,83 m²;'),
  blt('Comercial Vitória de Armarinhos - Edificação Mista - São José - 1.113,71 m²;'),
];

const doc = new Document({
  numbering: {
    config: [{
      reference: 'blt',
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: '•',
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 180 } } },
      }],
    }],
  },
  styles: {
    default: { document: { run: { font:'Arial', size:20, color:DARK } } },
  },
  sections: [
    {
    properties: {
      page: {
        size: { width:11906, height:16838 },
        margin: { top:MAR_T, right:MAR_R, bottom:2100, left:MAR_L, footer: 520 },
      },
    },
    footers: { default: footer() },
    children: page1,
  },
  {
    properties: {
      type: SectionType.NEXT_PAGE,
      page: {
        size: { width:11906, height:16838 },
        margin: { top:680, right:MAR_R, bottom:2300, left:MAR_L, footer: 520 },
      },
    },
    footers: { default: footer({ validade:true }) },
    children: page2,
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(d.saida, buf);
  console.log('DOCX gerado:', d.saida);
});
