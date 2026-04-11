const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { addSiteToBlocklist, removeSiteFromBlocklist, loadBlocklist } = require('./hostsManager');
const { logSession } = require('./tracker');

console.log("\x1b[36mStarting automated tests...\x1b[0m\n");

// We will backup the current files so we don't mess up the user's real data
const blocklistFile = path.join(__dirname, 'blocklist.json');
let backupBlocklist = null;
if (fs.existsSync(blocklistFile)) {
  backupBlocklist = fs.readFileSync(blocklistFile, 'utf8');
}

try {
  console.log("\x1b[1m[1] CENÁRIO: Caminho Feliz (Happy Path)\x1b[0m");
  // Expected standard user behavior: Add site, log normal duration.
  const added = addSiteToBlocklist('happy-path-site.com');
  assert.strictEqual(added, true, "Deve adicionar o site corretamente no caminho normal");
  
  const dataFile = path.join(__dirname, 'focus_data.json');
  logSession(25); // Path feliz comum de 25 min (Pomodoro padrão)
  const happyData = JSON.parse(fs.readFileSync(dataFile, 'utf8')).sessions;
  assert.strictEqual(happyData[happyData.length - 1].duration, 25, "Sessão de 25 min deve ser logada");
  console.log("  \x1b[32m\u2714\x1b[0m Caminho Feliz validado!");

  console.log("\n\x1b[1m[2] CENÁRIO: Entrada Inválida (Invalid Input / Misbehavior)\x1b[0m");
  // User trying to add an already blocked site
  const addedAgain = addSiteToBlocklist('happy-path-site.com');
  assert.strictEqual(addedAgain, false, "Comportamento indesejado: não deve permitir adicionar sites duplicados");
  // User trying to remove a site they never added
  const removedGhost = removeSiteFromBlocklist('never-added.com');
  assert.strictEqual(removedGhost, false, "Deve falhar graciosamente ao remover site inexistente");
  console.log("  \x1b[32m\u2714\x1b[0m Entradas inválidas tratadas nativamente!");

  console.log("\n\x1b[1m[3] CENÁRIO: Caso Limite (Edge Case)\x1b[0m");
  // Edge case: Negative time, huge time, or fractional minutes log handling in tracker
  logSession(0); // If timer stopped instantly
  const edgeZeroData = JSON.parse(fs.readFileSync(dataFile, 'utf8')).sessions;
  assert.strictEqual(edgeZeroData[edgeZeroData.length - 1].duration, 0, "Deve aceitar registro de 0 minutos limpos");
  
  // Edge case: Remove the last remaining site properly without breaking blocklist JSON
  removeSiteFromBlocklist('happy-path-site.com');
  const finalBlocklist = loadBlocklist();
  assert.ok(Array.isArray(finalBlocklist), "A blocklist deve continuar sendo um array válido após manuseios limites");
  console.log("  \x1b[32m\u2714\x1b[0m Casos limites de persistência comportaram-se bem!");

  console.log("\n\x1b[32m\u2728 Todos os Automáticos passaram com sucesso!\x1b[0m");
} catch (error) {
  console.error("\n\x1b[31m\u2716 Falha na Execução de Testes!\x1b[0m");
  console.error(error);
} finally {
  // Restore user blocklist state
  if (backupBlocklist !== null) {
    fs.writeFileSync(blocklistFile, backupBlocklist, 'utf8');
  } else if (fs.existsSync(blocklistFile)) {
    fs.unlinkSync(blocklistFile); // It was created during test
  }
}
