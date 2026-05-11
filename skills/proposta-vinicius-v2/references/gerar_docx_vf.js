const path = require('path');
const fs   = require('fs');
const mod  = process.env.NODE_PATH || require('child_process').execSync('npm root -g').toString().trim();
const { Document, Packer, Paragraph, TextRun, ImageRun, AlignmentType, LevelFormat, BorderStyle, TabStopType, TabStopPosition } = require(path.join(mod, 'docx'));

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
  saida:     '/tmp/proposta_horizonte_v6.docx',
};

const RES  = '/Users/cristianmacos/styem primario/clientes/ativos/vinicius/recursos/templates';
const DARK = '1A1A1A';
const GRAY = '666666';

// A4: 11906 x 16838 DXA, margens 1134 DXA (~2cm) L/R, 720 bottom
// Largura do conteúdo: 11906 - 2*1134 = 9638 DXA
const MAR_L = 1134;
const MAR_R = 1134;
const MAR_T = 0;     // zero — imagem começa no topo
const MAR_B = 720;

// Imagem: 1584x672px, proporcional a A4 width 595pt => altura = 595*(672/1584) = 252pt
// Banner pag2: mesma imagem, altura 70pt
const CAPA_W = 595, CAPA_H = 252;
const BANR_W = 595, BANR_H = 70;

// helpers
const S = (text, opts={}) => new TextRun({ text, font: 'Arial', size: 22, color: DARK, ...opts });
const esp = (before=0, after=160) => new Paragraph({ spacing:{before,after}, children:[new TextRun('')] });

function titulo(text) {
  return new Paragraph({
    spacing: { before: 320, after: 120 },
    children: [S(text, { font:'Montserrat', bold:true, size:24, allCaps:true })],
  });
}

function corpo(text, justify=true) {
  return new Paragraph({
    alignment: justify ? AlignmentType.JUSTIFIED : AlignmentType.LEFT,
    spacing: { before: 0, after: 80 },
    children: [S(text)],
  });
}

function blt(text) {
  return new Paragraph({
    numbering: { reference: 'blt', level: 0 },
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 40, after: 40 },
    children: [S(text)],
  });
}

function campo(label, valor) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [
      S(label+'  ', { bold:true }),
      S(valor),
    ],
  });
}

const capaData = fs.readFileSync(path.join(RES, 'capa_wide.png'));
const logoData = fs.readFileSync(path.join(RES, 'logo_vf.jpg'));

function rodape() {
  return [
    esp(240, 80),
    // Logo + dados numa linha via tab stop
    new Paragraph({
      spacing: { before: 0, after: 40 },
      border: { top: { style: BorderStyle.SINGLE, size: 2, color: 'DDDDDD', space: 6 } },
      tabStops: [{ type: TabStopType.LEFT, position: 1000 }],
      children: [
        new ImageRun({ type:'jpg', data:logoData, transformation:{width:52,height:45},
          altText:{title:'VF',description:'Logo',name:'logo'} }),
      ],
    }),
    new Paragraph({
      spacing: { before: 0, after: 30 },
      children: [S('Endereço: Rua José de Araújo, 39.  Barreiros - São José.', { size:18, color:GRAY })],
    }),
    new Paragraph({
      spacing: { before: 0, after: 80 },
      children: [S('Contato: (48) 98874-9269   E-mail: contato@vf-engenharia.com   Site: www.vf-engenharia.com', { size:18, color:GRAY })],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 0, after: 30 },
      children: [S('Proposta válida por 15 dias.', { bold:true, size:20 })],
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [S(`São José, ${d.data_dia} de ${d.data_mes} de ${d.data_ano}.`, { size:20 })],
    }),
  ];
}

const children = [

  // ══ CAPA ══
  new Paragraph({
    spacing: { before:0, after:0 },
    children: [new ImageRun({ type:'png', data:capaData,
      transformation:{ width:CAPA_W, height:CAPA_H },
      altText:{title:'Capa',description:'Proposta',name:'capa'} })],
  }),

  // ══ CABEÇALHO ══
  esp(200, 60),
  campo('CLIENTE:', d.cliente),
  campo('CONTATO:', d.contato),
  esp(0, 80),

  // ══ PÁG 1 ══
  titulo('Descrição dos Serviços'),
  corpo(`Prestação de serviços de ELABORAÇÃO E APROVAÇÃO de Projeto Preventivo Contra Incêndio (PPCI) junto ao Corpo de Bombeiros Militar de Santa Catarina. Edificação com aproximadamente ${d.area_m2} m² de área construída em ${d.cidade}.`),
  esp(0, 80),

  titulo('Incluso na Proposta'),
  blt('Impressão do Projeto em A1 e Memoriais e envio dos arquivos em formato .DWG e PDF;'),
  blt('Emissão da ART - Anotação de Responsabilidade Técnica emitida por Engenheiro Civil;'),
  blt('Visitas técnicas à empresa e reunião para entrega do serviço;'),
  blt('Assessoria para obtenção de prorrogação de prazos (autos de fiscalização) junto ao CBMSC;'),
  blt('Acompanhamento da tramitação do processo até a sua aprovação pelo sistema e-SCI;'),
  blt('Elaboração do PPCI seguindo todas as normativas vigentes do CBMSC, bem como com a inclusão de todos os sistemas preventivos necessários para a edificação;'),
  blt('Nota fiscal (e-NFs) de todos os serviços prestados.'),
  esp(0, 80),

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

  ...rodape(),

  // ══ QUEBRA + BANNER PÁG 2 ══
  new Paragraph({
    pageBreakBefore: true,
    spacing: { before:0, after:0 },
    children: [new ImageRun({ type:'png', data:capaData,
      transformation:{ width:BANR_W, height:BANR_H },
      altText:{title:'Banner',description:'Banner',name:'banner'} })],
  }),
  esp(200, 60),

  // ══ PÁG 2 ══
  titulo('Não Está Incluso'),
  blt('Taxa de análise de Projeto do Corpo de Bombeiros Militar de SC;'),
  blt('Documentos para aprovação na prefeitura (EIV, EIPGV, Licenças Ambientais, Projetos hidrossanitário e elétrico);'),
  blt('Alterações realizadas após a aprovação do projeto.'),
  esp(0, 80),

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
  esp(0, 80),

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
  esp(0, 80),

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

  ...rodape(),
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
        style: { paragraph: { indent: { left: 480, hanging: 240 } } },
      }],
    }],
  },
  styles: {
    default: { document: { run: { font:'Arial', size:22, color:DARK } } },
  },
  sections: [{
    properties: {
      page: {
        size: { width:11906, height:16838 },
        margin: { top:MAR_T, right:MAR_R, bottom:MAR_B, left:MAR_L },
      },
    },
    children,
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(d.saida, buf);
  console.log('DOCX gerado:', d.saida);
});
