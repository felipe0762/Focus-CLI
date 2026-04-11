const readline = require('readline');
const { disableBlocking } = require('./hostsManager');
const { logSession } = require('./tracker');

let timerInterval;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function startTimer(minutes) {
  let remainingSeconds = minutes * 60;
  const totalSeconds = remainingSeconds;
  
  // Handle Ctrl+C (SIGINT) to clean up
  process.on('SIGINT', () => {
    stopTimer(totalSeconds, remainingSeconds);
    process.exit();
  });

  console.log(`\n\x1b[36m=== FOCUS SESSION STARTED ===\x1b[0m\n`);
  
  timerInterval = setInterval(() => {
    remainingSeconds--;
    
    // Clear line and update
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`[\x1b[32m${formatTime(remainingSeconds)}\x1b[0m] remaining... Keep focusing! \x1b[33m(Ctrl+C to stop early)\x1b[0m`);
    
    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      console.log(`\n\n\x1b[32m\u2728 Session Complete! Great job!\x1b[0m`);
      logSession(minutes);
      disableBlocking();
      process.exit(0);
    }
  }, 1000);
}

function stopTimer(totalSeconds, remainingSeconds) {
  if (timerInterval) clearInterval(timerInterval);
  
  const elapsedSeconds = totalSeconds - remainingSeconds;
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  
  console.log(`\n\n\x1b[31m[!] Focus Session Stopped Early.\x1b[0m`);
  
  if (elapsedMinutes > 0) {
    console.log(`Logging ${elapsedMinutes} minute(s) completed.`);
    logSession(elapsedMinutes);
  } else {
    console.log(`Session too short to log.`);
  }
  
  disableBlocking();
}

module.exports = {
  startTimer
};
