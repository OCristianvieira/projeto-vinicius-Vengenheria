// =============================================================
// INSERIR LINHA NO FOLLOW-UP — VF Engenharia
// Requer .env na pasta do cliente com:
//   GOOGLE_SHEET_ID=
//   GOOGLE_SERVICE_ACCOUNT_EMAIL=
//   GOOGLE_PRIVATE_KEY=
// =============================================================

const path = require('path');
const fs   = require('fs');

// Carregar .env da pasta do cliente
const envPath = path.join(__dirname, '../../../../.env');
if (!fs.existsSync(envPath)) {
  console.error('ERRO: .env não encontrado em', envPath);
  console.error('Siga o setup em CLAUDE.md seção "Conectar Google Sheets"');
  process.exit(1);
}
require('dotenv').config({ path: envPath });

const modulePath = process.env.NODE_PATH
  || require('child_process').execSync('npm root -g').toString().trim();
const { google } = require(path.join(modulePath, 'googleapis'));

// =============================================================
// DADOS DA LINHA — substituir estes valores
// =============================================================
const linha = {
  data:      '29/04',
  nome:      'Construtora Horizonte Ltda',
  telefone:  '(48) 99821-4477',
  retorno:   '06/05',
  fonte:     'trafego google',
  detalhes:  'PPCI 8500 reais',
  obs:       '',
};

// =============================================================
// AUTENTICAR E INSERIR
// =============================================================
async function inserir() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key:  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const aba = 'Follow up';

  const values = [[
    linha.data,
    linha.nome,
    linha.telefone,
    linha.retorno,
    linha.fonte,
    linha.detalhes,
    linha.obs,
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `'${aba}'!A:G`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values },
  });

  console.log('Lead registrado na planilha:');
  console.log(`  ${linha.data} | ${linha.nome} | ${linha.telefone} | Retorno: ${linha.retorno}`);
  console.log(`  Fonte: ${linha.fonte} | ${linha.detalhes}`);
}

inserir().catch(err => {
  console.error('Erro ao inserir na planilha:', err.message);
  process.exit(1);
});