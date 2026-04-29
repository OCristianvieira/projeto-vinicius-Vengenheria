const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// =============================================================
// DADOS DO CONTRATO — substituir estes valores
// =============================================================
const d = {
  contratante_nome:     'CONDOMÍNIO COMPLEXO TURÍSTICO Il CAMPANÁRIO',
  contratante_cnpj:     '00.000.000/0000-00',
  contratante_endereco: 'Avenida dos Búzios, n.º 1760, Jurerê Internacional, Florianópolis, SC, CEP 88053-301',
  contratante_rep:      'Carlos Berenhauser Leite',
  contratante_cargo:    'síndico',
  area_m2:              '44.149,15',
  tipo:                 'PPCI',           // PPCI | RPCI | HABITE-SE
  escopo_extra:         [],               // itens adicionais além do padrão
  valor_num:            '85.000,00',
  valor_ext:            'oitenta e cinco mil reais',
  pag_1_pct:            '30',
  pag_1_momento:        'quando da assinatura do presente contrato para o início dos serviços',
  pag_2_pct:            '40',
  pag_2_momento:        'quando o Projeto de Prevenção Contra Incêndio estiver concluído e protocolado para aprovação',
  pag_3_pct:            '30',
  pag_3_momento:        'quando o projeto estiver aprovado no Corpo de Bombeiros',
  prazo_dias:           '30',
  cidade_prefeitura:    'Florianópolis',
  cidade_assinatura:    'Florianópolis',
  data_assinatura:      '02 de junho de 2025',
  saida:                '/tmp/contrato_vf_teste.docx',
};

// Escopo padrão por tipo
const ESCOPO = {
  'PPCI': [
    'Impressão do Projeto em A1 e Memoriais e envio dos arquivos em formato .DWG e PDF;',
    'Emissão da ART - Anotação de Responsabilidade Técnica emitida por Engenheiro Civil;',
    'Visitas técnicas à empresa e reunião para entrega do serviço aqui contratado;',
    'Assessoria para obtenção do Atestado de Regularização junto ao CBMSC;',
    'Acompanhamento da tramitação dos processos até a sua aprovação pelo sistema e-SCI;',
    'Elaboração do PPCI seguindo todas as normativas vigentes do CBMSC, bem como com a inclusão de todos os sistemas preventivos necessários para a edificação;',
    'Emissão de nota fiscal (e-NFs) de todos os serviços prestados.',
  ],
  'RPCI': [
    'Emissão da ART - Anotação de Responsabilidade Técnica emitida por Engenheiro Civil;',
    'Acompanhamento da tramitação do processo até a sua aprovação pelo sistema e-SCI;',
    'Elaboração do RPCI seguindo todas as normativas vigentes do CBMSC;',
    'Elaboração de documentação técnica para obtenção do atestado de Habite-se do CBMSC;',
    'Emissão de nota fiscal (e-NFs) de todos os serviços prestados.',
  ],
  'HABITE-SE': [
    'Emissão da ART - Anotação de Responsabilidade Técnica emitida por Engenheiro Civil;',
    'Assessoria para obtenção de prorrogação de prazos junto ao CBMSC;',
    'Elaboração de documentação técnica para obtenção do atestado de Habite-se do CBMSC;',
    'Acompanhamento da tramitação do processo até a sua aprovação pelo sistema e-SCI;',
    'Emissão de nota fiscal (e-NFs) de todos os serviços prestados.',
  ],
};

// =============================================================
// EDITAR XML DO DOCX BASE
// =============================================================
const BASE = '/Users/cristianmacos/styem primario/clientes/ativos/vinicius/recursos/templates/contrato_base_vf.docx';
const TMP  = '/tmp/contrato_vf_work';

// Limpar e desempacotar
if (fs.existsSync(TMP)) fs.rmSync(TMP, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });
execSync(`cd "${TMP}" && unzip -q "${BASE}"`);

// Ler XML
const xmlPath = path.join(TMP, 'word/document.xml');
let xml = fs.readFileSync(xmlPath, 'utf8');

// Substituições simples (campos que aparecem como texto corrido)
const subs = {
  'CONDOMÍNIO COMPLEXO TURÍSTICO Il CAMPANÁRIO': d.contratante_nome,
  'Carlos Berenhauser Leite': d.contratante_rep,
  'síndico': d.contratante_cargo,
  'Avenida dos Búzios, n.º 1760, Jurerê Internacional, Florianópolis, SC, CEP 88053-301': d.contratante_endereco,
  '00.000.000/0000-00': d.contratante_cnpj,
  '44.149,15 m2': `${d.area_m2} m²`,
  'R$ 00.000,00 (XXX mil e novecentos reais)': `R$ ${d.valor_num} (${d.valor_ext})`,
  '30% quando da assinatura do presente contrato para o início dos serviços': `${d.pag_1_pct}% ${d.pag_1_momento}`,
  '40% quando o Projeto de Prevenção Contra Incêndio estiver concluído e protocolado para aprovação': `${d.pag_2_pct}% ${d.pag_2_momento}`,
  '30% quando o projeto estiver aprovado no Corpo de Bombeiros': `${d.pag_3_pct}% ${d.pag_3_momento}`,
  '30 (trinta) dias úteis': `${d.prazo_dias} (${numPorExtenso(parseInt(d.prazo_dias))}) dias úteis`,
  'Prefeitura Municipal de Florianópolis': `Prefeitura Municipal de ${d.cidade_prefeitura}`,
  'Florianópolis, 02 de junho de 2025': `${d.cidade_assinatura}, ${d.data_assinatura}`,
};

for (const [from, to] of Object.entries(subs)) {
  // substituir tanto no texto direto quanto em versão escapada para XML
  const escaped = from.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const toEsc   = to.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  xml = xml.split(escaped).join(toEsc);
  xml = xml.split(from).join(toEsc);
}

fs.writeFileSync(xmlPath, xml);

// Reempacotar
if (fs.existsSync(d.saida)) fs.unlinkSync(d.saida);
execSync(`cd "${TMP}" && zip -qr "${d.saida}" .`);
console.log('Contrato gerado:', d.saida);

// Helper
function numPorExtenso(n) {
  const m = {30:'trinta',60:'sessenta',45:'quarenta e cinco',90:'noventa',15:'quinze',20:'vinte',25:'vinte e cinco'};
  return m[n] || n.toString();
}
