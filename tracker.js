const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'focus_data.json');

function initData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ sessions: [] }), 'utf8');
  }
}

function getWeekNumber(d) {
  // ISO 8601 week number calculation
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  return d.getUTCFullYear() + '-W' + weekNo.toString().padStart(2, '0');
}

function logSession(durationMinutes) {
  initData();
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  
  data.sessions.push({
    timestamp: new Date().toISOString(),
    week: getWeekNumber(new Date()),
    duration: durationMinutes
  });
  
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function generateReport() {
  initData();
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const currentWeek = getWeekNumber(new Date());
  
  let totalMinutes = 0;
  let totalWeeklyMinutes = 0;
  
  data.sessions.forEach(session => {
    totalMinutes += session.duration;
    if (session.week === currentWeek) {
      totalWeeklyMinutes += session.duration;
    }
  });
  
  console.log(`\n=== \x1b[36mProductivity Report\x1b[0m ===`);
  console.log(`\n\x1b[1mCurrent Week (${currentWeek}):\x1b[0m`);
  console.log(`  Liquid Concentration Hours: \x1b[32m${(totalWeeklyMinutes / 60).toFixed(2)}h\x1b[0m (${totalWeeklyMinutes} mins)`);
  console.log(`\n\x1b[1mAll Time Total:\x1b[0m`);
  console.log(`  Liquid Concentration Hours: \x1b[32m${(totalMinutes / 60).toFixed(2)}h\x1b[0m (${totalMinutes} mins)`);
  console.log(`\n===========================\n`);
}

module.exports = {
  logSession,
  generateReport
};
