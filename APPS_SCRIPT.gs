
// ═══════════════════════════════════════════════════════════════════════════
// APPS SCRIPT — DNA Geracional & Mapeamento Comportamental | Instituto da Liderança
// Backend dedicado (planilha própria, separada do assessment-lideranca)
// ═══════════════════════════════════════════════════════════════════════════
var SHEET_ID      = '14cXiQPBxMfG3f2HIVS-qgH7TpN99nMY8MMzi5Oo3r18';
var ABA_RESPOSTAS = 'Respostas';
var ABA_TURMAS    = 'Turmas';

var CAB_RESPOSTAS = [
  'timestamp','nome','email','empresa','turma','fase',
  'gen_boomer','gen_x','gen_y','gen_z','gen_dominante',
  'sabotador_dominante','crenca_limitante','ancora_schein','ancora_secundaria',
  'estilo_lideranca','causa_proposito'
];
var TEXT_COLS_R = [1,2,3,4,5,6,11,12,13,14,15,16,17];

// ── doGet ────────────────────────────────────────────────────────────────────
function doGet(e) {
  var out = ContentService.createTextOutput().setMimeType(ContentService.MimeType.JSON);
  try {
    var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'getRespostas';
    if (action === 'getTurmas') return out.setContent(JSON.stringify(doGetTurmas()));
    return out.setContent(JSON.stringify(sheetToJson(ABA_RESPOSTAS)));
  } catch(err) {
    return out.setContent(JSON.stringify({status:'error', message:err.toString()}));
  }
}

function sheetToJson(abaName) {
  var ss    = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(abaName);
  if (!sheet || sheet.getLastRow() <= 1) return {status:'ok', data:[], total:0};
  var headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  var rows    = sheet.getRange(2,1,sheet.getLastRow()-1,sheet.getLastColumn()).getValues();
  var data = rows.map(function(row, idx) {
    var obj = {_id: idx};
    headers.forEach(function(h,i){ obj[h] = (row[i] !== null && row[i] !== undefined) ? String(row[i]) : ''; });
    return obj;
  });
  return {status:'ok', data:data, total:data.length};
}

// ── doPost ───────────────────────────────────────────────────────────────────
function doPost(e) {
  var out = ContentService.createTextOutput().setMimeType(ContentService.MimeType.JSON);
  if (!e || !e.postData || !e.postData.contents) {
    return out.setContent(JSON.stringify({status:'error', message:'Use HTTP POST. Para testes, chame testarInsercao().'}));
  }
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.action === 'saveTurmas') return out.setContent(JSON.stringify(doSaveTurmas(data.turmas)));
    return out.setContent(JSON.stringify(doSaveResposta(data)));
  } catch(err) {
    Logger.log('Erro doPost: ' + err.toString());
    return out.setContent(JSON.stringify({status:'error', message:err.toString()}));
  }
}

// ── Turmas — leitura ─────────────────────────────────────────────────────────
function doGetTurmas() {
  var ss    = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(ABA_TURMAS);
  if (!sheet || sheet.getLastRow() <= 1) return {status:'ok', turmas:['Geral']};
  // Começa na linha 2: linha 1 é o cabeçalho ('turma','ativo'), não um valor.
  var vals = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues()
               .flat()
               .map(function(v){ return String(v).trim(); })
               .filter(function(v){ return v.length > 0; });
  if (!vals.length) return {status:'ok', turmas:['Geral']};
  return {status:'ok', turmas: vals};
}

// ── Turmas — escrita ───────────────────────────────────────────────────────────
function doSaveTurmas(turmas) {
  if (!Array.isArray(turmas) || !turmas.length) return {status:'error', message:'Lista de turmas vazia'};
  var ss    = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(ABA_TURMAS);
  if (!sheet) {
    sheet = ss.insertSheet(ABA_TURMAS);
    var h = sheet.getRange(1,1,1,2);
    h.setValues([['turma','ativo']]);
    h.setFontWeight('bold'); h.setBackground('#261062'); h.setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
  }
  if (sheet.getLastRow() > 1) sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();
  var rows = turmas.map(function(t){ return [String(t).trim(), 'SIM']; });
  sheet.getRange(2, 1, rows.length, 2).setValues(rows);
  sheet.getRange(2, 1, rows.length, 1).setNumberFormat('@');
  return {status:'ok', saved: rows.length};
}

// ── Salvar resposta do diagnóstico ────────────────────────────────────────────
function doSaveResposta(d) {
  var ss    = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(ABA_RESPOSTAS);
  if (!sheet) { configurarAbas(); sheet = ss.getSheetByName(ABA_RESPOSTAS); }

  var linha = [
    d.timestamp || new Date().toISOString(),
    d.nome || '', d.email || '', d.empresa || '', d.turma || '', d.fase || '',
    Number(d.gen_boomer)||0, Number(d.gen_x)||0, Number(d.gen_y)||0, Number(d.gen_z)||0,
    d.gen_dominante || '',
    d.sabotador_dominante || '', d.crenca_limitante || '',
    d.ancora_schein || '', d.ancora_secundaria || '',
    d.estilo_lideranca || '', d.causa_proposito || ''
  ];

  sheet.appendRow(linha);
  var lastRow = sheet.getLastRow();
  TEXT_COLS_R.forEach(function(col){ sheet.getRange(lastRow,col,1,1).setNumberFormat('@'); });
  if (lastRow % 2 === 0) sheet.getRange(lastRow,1,1,CAB_RESPOSTAS.length).setBackground('#F4F0FB');
  return {status:'ok', nome:d.nome, row:lastRow};
}

// ── Configurar abas ───────────────────────────────────────────────────────────
function configurarAbas() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sh = ss.getSheetByName(ABA_RESPOSTAS);
  if (!sh) sh = ss.insertSheet(ABA_RESPOSTAS);
  if (sh.getLastRow() === 0) {
    sh.getRange(1,1,1,CAB_RESPOSTAS.length).setValues([CAB_RESPOSTAS]);
    var hr = sh.getRange(1,1,1,CAB_RESPOSTAS.length);
    hr.setFontWeight('bold'); hr.setBackground('#261062'); hr.setFontColor('#FFFFFF');
    sh.setFrozenRows(1);
  }
  TEXT_COLS_R.forEach(function(c){ sh.getRange(1,c,1000,1).setNumberFormat('@'); });
  if (!ss.getSheetByName(ABA_TURMAS)) doSaveTurmas(['Geral']);
  Logger.log('Aba Respostas configurada com ' + CAB_RESPOSTAS.length + ' colunas.');
}

// ── Testes (executar no editor) ───────────────────────────────────────────────
function testarInsercao() {
  var r = doSaveResposta({
    timestamp: new Date().toISOString(),
    nome:'TESTE — Apagar', email:'teste@il.com', empresa:'Instituto da Liderança',
    turma:'Geral', fase:'Pré-Treinamento',
    gen_boomer:8, gen_x:50, gen_y:25, gen_z:17, gen_dominante:'Geração X',
    sabotador_dominante:'Cético-Hiper-Realizador',
    crenca_limitante:'"Só posso confiar no que eu mesmo(a) verificar — se eu não checar, algo vai dar errado."',
    ancora_schein:'Autonomia / Independência', ancora_secundaria:'Dedicação a uma Causa',
    estilo_lideranca:'Orientado a Resultados & Descentralizado',
    causa_proposito:'Eficiência e Resolução de Problemas Complexos'
  });
  Logger.log('Resposta: ' + JSON.stringify(r));
}

function testarTurmas() {
  Logger.log('Save: ' + JSON.stringify(doSaveTurmas(['Geral','Impact Leader · T1'])));
  Logger.log('Get: '  + JSON.stringify(doGetTurmas()));
}

function limparTeste() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sh = ss.getSheetByName(ABA_RESPOSTAS);
  if (!sh) return;
  var rows = sh.getDataRange().getValues();
  for (var i = rows.length - 1; i >= 1; i--) {
    if (String(rows[i][1]).indexOf('TESTE') !== -1) sh.deleteRow(i+1);
  }
  Logger.log('Linhas de teste removidas');
}

function verEstatisticas() {
  Logger.log('Respostas: ' + sheetToJson(ABA_RESPOSTAS).total);
  Logger.log('Turmas: ' + JSON.stringify(doGetTurmas()));
}
