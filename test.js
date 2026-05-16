const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { addSiteToBlocklist, removeSiteFromBlocklist, loadBlocklist } = require('./hostsManager');
const { logSession } = require('./tracker');

console.log("\x1b[36mStarting automated tests...\x1b[0m\n");

const blocklistFile = path.join(__dirname, 'blocklist.json');
let backupBlocklist = null;
if (fs.existsSync(blocklistFile)) {
  backupBlocklist = fs.readFileSync(blocklistFile, 'utf8');
}
test('Deve conectar com a API de conselhos e retornar um texto', async () => {
    const resposta = await fetch('https://api.adviceslip.com/advice');
    const dados = await resposta.json();

    expect(resposta.status).toBe(200); // 200 significa "OK, conectado!"
    expect(dados.slip.advice).toBeDefined(); // Garante que a frase não veio vazia
});

try {
  console.log("\x1b[1m[1] CENÁRIO: Caminho Feliz (Happy Path)\x1b[0m");
  const added = addSiteToBlocklist('happy-path-site.com');
  assert.strictEqual(added, true, "Deve adicionar o site corretamente no caminho normal");
  
  const dataFile = path.join(__dirname, 'focus_data.json');
  logSession(25);
  const happyData = JSON.parse(fs.readFileSync(dataFile, 'utf8')).sessions;
  assert.strictEqual(happyData[happyData.length - 1].duration, 25, "Sessão de 25 min deve ser logada");
  console.log("  \x1b[32m\u2714\x1b[0m Caminho Feliz validado!");

  console.log("\n\x1b[1m[2] CENÁRIO: Entrada Inválida (Invalid Input / Misbehavior)\x1b[0m");
  const addedAgain = addSiteToBlocklist('happy-path-site.com');
  assert.strictEqual(addedAgain, false, "Comportamento indesejado: não deve permitir adicionar sites duplicados");
  const removedGhost = removeSiteFromBlocklist('never-added.com');
  assert.strictEqual(removedGhost, false, "Deve falhar graciosamente ao remover site inexistente");
  console.log("  \x1b[32m\u2714\x1b[0m Entradas inválidas tratadas nativamente!");

  console.log("\n\x1b[1m[3] CENÁRIO: Caso Limite (Edge Case)\x1b[0m");
  logSession(0);
  const edgeZeroData = JSON.parse(fs.readFileSync(dataFile, 'utf8')).sessions;
  assert.strictEqual(edgeZeroData[edgeZeroData.length - 1].duration, 0, "Deve aceitar registro de 0 minutos limpos");
  

  removeSiteFromBlocklist('happy-path-site.com');
  const finalBlocklist = loadBlocklist();
  assert.ok(Array.isArray(finalBlocklist), "A blocklist deve continuar sendo um array válido após manuseios limites");
  console.log("  \x1b[32m\u2714\x1b[0m Casos limites de persistência comportaram-se bem!");

  console.log("\n\x1b[32m\u2728 Todos os Automáticos passaram com sucesso!\x1b[0m");
} catch (error) {
  console.error("\n\x1b[31m\u2716 Falha na Execução de Testes!\x1b[0m");
  console.error(error);
} finally {
  if (backupBlocklist !== null) {
    fs.writeFileSync(blocklistFile, backupBlocklist, 'utf8');
  } else if (fs.existsSync(blocklistFile)) {
    fs.unlinkSync(blocklistFile); 
  }
}
