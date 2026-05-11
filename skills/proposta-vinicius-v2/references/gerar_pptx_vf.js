// =============================================================
// PROPOSTA VF ENGENHARIA — pptxgenjs
// Copiar para /tmp/gerar_proposta_vf_[cliente].js
// Substituir o objeto `dados` e rodar:
//   NODE_PATH=/Users/cristianmacos/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules node /tmp/gerar_proposta_vf_[cliente].js
// =============================================================

const path = require('path');
const modulePath = process.env.NODE_PATH
  || '/Users/cristianmacos/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const PptxGenJS = require(path.join(modulePath, 'pptxgenjs'));

// =============================================================
// DADOS DO CLIENTE — substituir estes valores
// =============================================================
const dados = {
  cliente:   'Empresa Teste Ltda',
  contato:   '(48) 99999-9999',
  tipo:      'RPCI + Habite-se',
  area_m2:   '1.250,00',
  cidade:    'Florianópolis',
  valor_num: '4.500,00',
  valor_ext: 'quatro mil e quinhentos reais',
  data_dia:  '29',
  data_mes:  'abril',
  data_ano:  '2026',
  descricao: 'Prestação de serviços de ELABORAÇÃO E APROVAÇÃO de Relatório de Prevenção e Combate a Incêndio e Habite-se junto ao Corpo de Bombeiros Militar de Santa Catarina. Edificação com 1.250,00 m² de área construída em Florianópolis.',
  incluso: [
    'Emissão da ART - Anotação de Responsabilidade Técnica emitida por Engenheiro Civil;',
    'Acompanhamento da tramitação do processo até a sua aprovação pelo sistema e-SCI;',
    'Elaboração do RPCI seguindo todas as normativas vigentes do CBMSC, bem como com a inclusão de todos os sistemas preventivos necessários para a edificação;',
    'Elaboração de documentação técnica para obtenção do atestado de Habite-se do CBMSC;',
    'Nota fiscal (e-NFS) de todos os serviços prestados;',
  ],
  excluido: [
    'Taxa de analise e de vistoria do Corpo de Bombeiros Militar de SC;',
    'Documentos para aprovação na prefeitura (EIV, EIPGV, Licenças Ambientais, Projetos hidrossanitário e elétrico);',
    'Laudos de sistemas preventivos específicos que possam ser requisitados posteriormente pelo Corpo de Bombeiros e que não estão incluídos no escopo de serviço deste contrato;',
    'Materiais que necessitarem ser substituídos ou possíveis adequações que por ventura venham a ser solicitadas pelo Corpo de Bombeiros;',
  ],
  parcelas: [
    { frac: '1/3', momento: 'Na assinatura do contrato' },
    { frac: '1/3', momento: 'RPCI aprovado no Corpo de Bombeiros' },
    { frac: '1/3', momento: 'Habite-se aprovado no Corpo de Bombeiros' },
  ],
  prazo: '30 (trinta) dias a partir da assinatura do termo de aceite e pagamento do valor da entrada.',
  saida: '/tmp/slides_vf_teste.pptx',
};

// =============================================================
// PALETA VF ENGENHARIA
// =============================================================
const C = {
  RED:    'D94F3D',   // vermelho VF — acento principal
  DARK:   '1A1A1A',   // preto — fundo externo e texto escuro
  DARK2:  '2C2C2C',   // cinza muito escuro — titlebar
  WHITE:  'FFFFFF',   // branco — fundo da janela
  TEXT:   '1A1A1A',   // texto principal sobre fundo branco
  SUB:    '555555',   // texto secundário
  LIGHT:  'F5F5F5',   // fundo alternado suave
  LINE:   'E0E0E0',   // linhas divisórias
  W:      13.33,
  H:      7.5,
  PAD:    0.3,
};

// janela interna (moldura preta externa, janela branca interna)
const WIN = {
  x: C.PAD, y: C.PAD,
  w: C.W - C.PAD * 2,
  h: C.H - C.PAD * 2,
};
const TB_H  = 0.38;
const BODY_X = WIN.x + 0.65;
const BODY_Y = WIN.y + TB_H + 0.45;
const BODY_W = WIN.w - 1.3;

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';

// =============================================================
// HELPERS
// =============================================================
function addWindowBase(slide, winBg) {
  // fundo externo preto
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: C.W, h: C.H,
    fill: { color: C.DARK },
  });
  // janela
  slide.addShape(pptx.ShapeType.rect, {
    x: WIN.x, y: WIN.y, w: WIN.w, h: WIN.h,
    fill: { color: winBg || C.WHITE },
    shadow: { type: 'outer', blur: 16, offset: 6, angle: 45, color: '000000', opacity: 0.4 },
  });
  // titlebar vermelho VF
  slide.addShape(pptx.ShapeType.rect, {
    x: WIN.x, y: WIN.y, w: WIN.w, h: TB_H,
    fill: { color: C.RED },
  });
  // dots macOS (estrutura, não identidade)
  const dots = [
    { x: WIN.x + 0.16, color: 'FF5F57' },
    { x: WIN.x + 0.35, color: 'FEBC2E' },
    { x: WIN.x + 0.54, color: '28C840' },
  ];
  dots.forEach(d => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x: d.x, y: WIN.y + 0.12, w: 0.13, h: 0.13,
      fill: { color: d.color },
    });
  });
  // label da janela no centro da titlebar
  slide.addText('VF Engenharia', {
    x: WIN.x, y: WIN.y, w: WIN.w, h: TB_H,
    fontSize: 10, fontFace: 'Arial', color: 'FFFFFF',
    align: 'center', valign: 'middle', bold: true,
  });
}

function addFooterBar(slide, label) {
  slide.addShape(pptx.ShapeType.rect, {
    x: WIN.x, y: WIN.y + WIN.h - 0.48, w: WIN.w, h: 0.48,
    fill: { color: C.DARK },
  });
  slide.addText(label, {
    x: WIN.x + 0.5, y: WIN.y + WIN.h - 0.48,
    w: WIN.w - 1, h: 0.48,
    fontSize: 10, fontFace: 'Arial', color: 'AAAAAA',
    valign: 'middle',
  });
}

function addSectionHeader(slide, title) {
  // barra vermelha lateral
  slide.addShape(pptx.ShapeType.rect, {
    x: BODY_X, y: BODY_Y, w: 0.05, h: 0.65,
    fill: { color: C.RED },
  });
  slide.addText(title, {
    x: BODY_X + 0.15, y: BODY_Y,
    w: BODY_W - 0.15, h: 0.65,
    fontSize: 28, bold: true, fontFace: 'Arial Black',
    color: C.TEXT,
  });
  // linha divisória
  slide.addShape(pptx.ShapeType.rect, {
    x: BODY_X, y: BODY_Y + 0.72, w: BODY_W, h: 0.015,
    fill: { color: C.LINE },
  });
}

// =============================================================
// SLIDE 1 — CAPA
// =============================================================
{
  const slide = pptx.addSlide();

  // fundo externo preto
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: C.W, h: C.H,
    fill: { color: C.DARK },
  });

  // metade esquerda — vermelho VF
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: C.W * 0.42, h: C.H,
    fill: { color: C.RED },
  });

  // "VF" grande na esquerda
  slide.addText('VF', {
    x: 0.5, y: 1.0,
    w: C.W * 0.42 - 0.5, h: 3.5,
    fontSize: 160, bold: true, fontFace: 'Arial Black',
    color: 'FFFFFF', valign: 'middle',
  });

  // "ENGENHARIA" menor abaixo
  slide.addText('ENGENHARIA', {
    x: 0.5, y: 4.8,
    w: C.W * 0.42 - 0.5, h: 0.6,
    fontSize: 18, bold: true, fontFace: 'Arial Black',
    color: 'FFFFFF', charSpacing: 5,
  });

  // linha vertical separadora branca fina
  slide.addShape(pptx.ShapeType.rect, {
    x: C.W * 0.42, y: 0.6, w: 0.03, h: C.H - 1.2,
    fill: { color: 'FFFFFF' },
  });

  // lado direito — dados da proposta
  const RX = C.W * 0.42 + 0.6;
  const RW = C.W - RX - 0.4;

  slide.addText('PROPOSTA DE SERVIÇO', {
    x: RX, y: 1.2,
    w: RW, h: 1.6,
    fontSize: 36, bold: true, fontFace: 'Arial Black',
    color: 'FFFFFF', breakLine: true,
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: RX, y: 2.9, w: RW, h: 0.02,
    fill: { color: '444444' },
  });

  slide.addText(dados.tipo.toUpperCase(), {
    x: RX, y: 3.1, w: RW, h: 0.4,
    fontSize: 13, bold: true, fontFace: 'Arial',
    color: C.RED,
  });

  slide.addText(dados.cliente, {
    x: RX, y: 3.6, w: RW, h: 0.45,
    fontSize: 18, bold: true, fontFace: 'Arial Black',
    color: 'FFFFFF',
  });

  slide.addText(`${dados.area_m2} m²  |  ${dados.cidade}`, {
    x: RX, y: 4.2, w: RW, h: 0.35,
    fontSize: 13, fontFace: 'Arial', color: 'AAAAAA',
  });

  slide.addText(`${dados.data_dia} de ${dados.data_mes} de ${dados.data_ano}  |  Válida por 15 dias`, {
    x: RX, y: C.H - 0.8, w: RW, h: 0.35,
    fontSize: 11, fontFace: 'Arial', color: '777777',
  });
}

// =============================================================
// SLIDE 2 — DESCRIÇÃO DOS SERVIÇOS
// =============================================================
{
  const slide = pptx.addSlide();
  addWindowBase(slide);

  addSectionHeader(slide, 'DESCRIÇÃO DOS SERVIÇOS');

  slide.addText(dados.descricao, {
    x: BODY_X, y: BODY_Y + 0.9,
    w: BODY_W, h: 3.2,
    fontSize: 15, fontFace: 'Arial',
    color: C.TEXT, valign: 'top', breakLine: true,
    lineSpacingMultiple: 1.6,
  });

  // tag badge tipo
  slide.addShape(pptx.ShapeType.rect, {
    x: BODY_X, y: WIN.y + WIN.h - 1.1, w: 3.8, h: 0.42,
    fill: { color: C.RED },
  });
  slide.addText(dados.tipo.toUpperCase(), {
    x: BODY_X + 0.15, y: WIN.y + WIN.h - 1.1,
    w: 3.5, h: 0.42,
    fontSize: 11, bold: true, fontFace: 'Arial',
    color: 'FFFFFF', valign: 'middle',
  });

  addFooterBar(slide, `${dados.area_m2} m²  |  ${dados.cidade}  |  VF Engenharia`);
}

// =============================================================
// SLIDE 3 — INCLUSO NA PROPOSTA
// =============================================================
{
  const slide = pptx.addSlide();
  addWindowBase(slide);

  addSectionHeader(slide, 'INCLUSO NA PROPOSTA');

  let yPos = BODY_Y + 0.9;
  dados.incluso.forEach(item => {
    // fundo leve alternado
    slide.addShape(pptx.ShapeType.rect, {
      x: BODY_X, y: yPos - 0.04, w: BODY_W, h: 0.48,
      fill: { color: C.LIGHT },
    });
    // borda esquerda vermelha
    slide.addShape(pptx.ShapeType.rect, {
      x: BODY_X, y: yPos - 0.04, w: 0.04, h: 0.48,
      fill: { color: C.RED },
    });
    slide.addText([
      { text: '✓  ', options: { color: C.RED, bold: true, fontSize: 13, fontFace: 'Arial' } },
      { text: item, options: { color: C.TEXT, fontSize: 13, fontFace: 'Arial' } },
    ], {
      x: BODY_X + 0.15, y: yPos, w: BODY_W - 0.2, h: 0.4,
      valign: 'top',
    });
    yPos += 0.56;
  });

  addFooterBar(slide, 'Vinicius Marcos Figueiredo  |  CREA 198631-4  |  Engenheiro Civil');
}

// =============================================================
// SLIDE 4 — NÃO ESTÁ INCLUSO
// =============================================================
{
  const slide = pptx.addSlide();
  addWindowBase(slide);

  addSectionHeader(slide, 'NÃO ESTÁ INCLUSO');

  let yPos = BODY_Y + 0.9;
  dados.excluido.forEach(item => {
    slide.addShape(pptx.ShapeType.rect, {
      x: BODY_X, y: yPos - 0.04, w: BODY_W, h: 0.48,
      fill: { color: C.LIGHT },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: BODY_X, y: yPos - 0.04, w: 0.04, h: 0.48,
      fill: { color: 'CCCCCC' },
    });
    slide.addText([
      { text: '✗  ', options: { color: 'AAAAAA', bold: true, fontSize: 13, fontFace: 'Arial' } },
      { text: item, options: { color: C.SUB, fontSize: 13, fontFace: 'Arial' } },
    ], {
      x: BODY_X + 0.15, y: yPos, w: BODY_W - 0.2, h: 0.4,
      valign: 'top',
    });
    yPos += 0.56;
  });

  addFooterBar(slide, 'www.vf-engenharia.com  |  (48) 98874-9269');
}

// =============================================================
// SLIDE 5 — VALOR E FORMA DE PAGAMENTO
// =============================================================
{
  const slide = pptx.addSlide();
  addWindowBase(slide);

  // metade esquerda com fundo escuro para o valor
  slide.addShape(pptx.ShapeType.rect, {
    x: WIN.x, y: WIN.y + TB_H, w: WIN.w * 0.45, h: WIN.h - TB_H,
    fill: { color: C.DARK },
  });

  slide.addText('INVESTIMENTO', {
    x: WIN.x + 0.5, y: BODY_Y,
    w: WIN.w * 0.45 - 0.6, h: 0.55,
    fontSize: 13, bold: true, fontFace: 'Arial', color: 'AAAAAA',
    charSpacing: 2,
  });

  slide.addText(`R$\n${dados.valor_num}`, {
    x: WIN.x + 0.5, y: BODY_Y + 0.6,
    w: WIN.w * 0.45 - 0.6, h: 2.8,
    fontSize: 58, bold: true, fontFace: 'Arial Black',
    color: C.RED, valign: 'top', breakLine: true,
  });

  slide.addText(dados.valor_ext, {
    x: WIN.x + 0.5, y: BODY_Y + 3.3,
    w: WIN.w * 0.45 - 0.6, h: 0.4,
    fontSize: 11, fontFace: 'Arial', color: '666666',
  });

  // lado direito — parcelas
  const RX = WIN.x + WIN.w * 0.45 + 0.5;
  const RW = WIN.w - WIN.w * 0.45 - 0.9;

  slide.addText('FORMA DE PAGAMENTO', {
    x: RX, y: BODY_Y, w: RW, h: 0.4,
    fontSize: 12, bold: true, fontFace: 'Arial', color: C.SUB, charSpacing: 1,
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: RX, y: BODY_Y + 0.45, w: RW, h: 0.015,
    fill: { color: C.LINE },
  });

  const parcH = (WIN.h - TB_H - 1.2) / dados.parcelas.length;
  dados.parcelas.forEach((p, i) => {
    const py = BODY_Y + 0.6 + i * (parcH + 0.1);
    slide.addShape(pptx.ShapeType.rect, {
      x: RX, y: py, w: RW, h: parcH,
      fill: { color: i % 2 === 0 ? C.LIGHT : 'EBEBEB' },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: RX, y: py, w: 0.05, h: parcH,
      fill: { color: C.RED },
    });
    slide.addText(p.frac, {
      x: RX + 0.2, y: py + 0.05, w: 1.0, h: 0.5,
      fontSize: 28, bold: true, fontFace: 'Arial Black', color: C.RED,
    });
    slide.addText(p.momento, {
      x: RX + 1.3, y: py + 0.12, w: RW - 1.5, h: 0.5,
      fontSize: 13, fontFace: 'Arial', color: C.TEXT,
      breakLine: true, lineSpacingMultiple: 1.3,
    });
  });

  addFooterBar(slide, `Prazo: ${dados.prazo}`);
}

// =============================================================
// SLIDE 6 — RESPONSABILIDADE TÉCNICA
// =============================================================
{
  const slide = pptx.addSlide();
  addWindowBase(slide);

  addSectionHeader(slide, 'RESPONSABILIDADE TÉCNICA');

  // card do engenheiro
  slide.addShape(pptx.ShapeType.rect, {
    x: BODY_X, y: BODY_Y + 0.85,
    w: BODY_W * 0.58, h: 2.2,
    fill: { color: C.LIGHT },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: BODY_X, y: BODY_Y + 0.85,
    w: 0.06, h: 2.2,
    fill: { color: C.RED },
  });

  slide.addText('Vinicius Marcos Figueiredo', {
    x: BODY_X + 0.2, y: BODY_Y + 0.95,
    w: BODY_W * 0.58 - 0.3, h: 0.5,
    fontSize: 17, bold: true, fontFace: 'Arial Black', color: C.TEXT,
  });
  slide.addText('CREA 198631-4  |  Engenheiro Civil', {
    x: BODY_X + 0.2, y: BODY_Y + 1.45,
    w: BODY_W * 0.58 - 0.3, h: 0.35,
    fontSize: 12, bold: true, fontFace: 'Arial', color: C.RED,
  });
  slide.addText('Profissional com comprovada experiência na área de prevenção e combate a incêndio, formado pela Universidade Federal de Santa Catarina (UFSC).', {
    x: BODY_X + 0.2, y: BODY_Y + 1.85,
    w: BODY_W * 0.58 - 0.3, h: 0.9,
    fontSize: 12, fontFace: 'Arial', color: C.SUB,
    breakLine: true, lineSpacingMultiple: 1.4,
  });

  // lado direito — contato
  const RX = BODY_X + BODY_W * 0.62;
  const RW = BODY_W * 0.38;

  slide.addText('CONTATO', {
    x: RX, y: BODY_Y + 0.85, w: RW, h: 0.35,
    fontSize: 11, bold: true, fontFace: 'Arial', color: C.RED, charSpacing: 2,
  });

  [
    '(48) 98874-9269',
    'contato@vf-engenharia.com',
    'www.vf-engenharia.com',
    'Rua José de Araújo, 39',
    'Barreiros — São José/SC',
  ].forEach((line, i) => {
    slide.addText(line, {
      x: RX, y: BODY_Y + 1.3 + i * 0.35,
      w: RW, h: 0.35,
      fontSize: 12, fontFace: 'Arial', color: C.TEXT,
    });
  });

  addFooterBar(slide, 'Proposta válida por 15 dias  |  VF Engenharia');
}

// =============================================================
// SLIDE 7 — PRÓXIMOS PASSOS
// =============================================================
{
  const slide = pptx.addSlide();

  // fundo externo preto
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: C.W, h: C.H,
    fill: { color: C.DARK },
  });

  // faixa vermelha no topo
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: C.W, h: 1.2,
    fill: { color: C.RED },
  });

  slide.addText('VF Engenharia', {
    x: 0.5, y: 0, w: C.W - 1, h: 1.2,
    fontSize: 13, bold: true, fontFace: 'Arial',
    color: 'FFFFFF', valign: 'middle',
  });

  slide.addText('PRÓXIMOS PASSOS', {
    x: 0.8, y: 1.5, w: C.W - 1.6, h: 0.8,
    fontSize: 36, bold: true, fontFace: 'Arial Black',
    color: 'FFFFFF', align: 'center',
  });

  const passos = [
    'Você confirma o interesse nesta proposta',
    'Assinatura do Termo de Aceite',
    'Início dos serviços em até 5 dias úteis',
  ];
  passos.forEach((p, i) => {
    const py = 2.6 + i * 1.0;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: C.W / 2 - 3.5, y: py + 0.05,
      w: 0.5, h: 0.5,
      fill: { color: C.RED },
    });
    slide.addText(`${i + 1}`, {
      x: C.W / 2 - 3.5, y: py + 0.05,
      w: 0.5, h: 0.5,
      fontSize: 14, bold: true, fontFace: 'Arial Black',
      color: 'FFFFFF', align: 'center', valign: 'middle',
    });
    slide.addText(p, {
      x: C.W / 2 - 2.8, y: py,
      w: 6.0, h: 0.6,
      fontSize: 16, fontFace: 'Arial', color: 'DDDDDD',
      valign: 'middle',
    });
  });

  slide.addText(`Válida até ${dados.data_dia} de ${dados.data_mes} de ${dados.data_ano}  |  ${dados.cliente}`, {
    x: 0.5, y: C.H - 0.7, w: C.W - 1, h: 0.4,
    fontSize: 11, fontFace: 'Arial', color: '666666', align: 'center',
  });
}

// =============================================================
// SALVAR
// =============================================================
pptx.writeFile({ fileName: dados.saida })
  .then(() => console.log(`\nPPTX gerado: ${dados.saida}`))
  .catch(err => console.error('Erro ao gerar PPTX:', err));