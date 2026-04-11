const fs = require('fs');
const os = require('os');
const path = require('path');

// C:\Windows\System32\drivers\etc\hosts on Windows
const HOSTS_FILE = os.platform() === 'win32' 
  ? 'C:\\Windows\\System32\\drivers\\etc\\hosts' 
  : '/etc/hosts';

const START_MARKER = '# --- FOCUS CLI BLOCK START ---';
const END_MARKER = '# --- FOCUS CLI BLOCK END ---';

// Default distraction sites (can be customized)
const defaultBlocklist = [
  'facebook.com', 'www.facebook.com',
  'twitter.com', 'x.com', 'www.twitter.com',
  'instagram.com', 'www.instagram.com',
  'youtube.com', 'www.youtube.com',
  'reddit.com', 'www.reddit.com',
  'tiktok.com', 'www.tiktok.com'
];

function getBlocklistFile() {
  const dir = __dirname;
  return path.join(dir, 'blocklist.json');
}

function loadBlocklist() {
  const file = getBlocklistFile();
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  return defaultBlocklist;
}

function saveBlocklist(list) {
  fs.writeFileSync(getBlocklistFile(), JSON.stringify(list, null, 2));
}

function addSiteToBlocklist(site) {
  const list = loadBlocklist();
  if (!list.includes(site)) {
    list.push(site);
    saveBlocklist(list);
    return true;
  }
  return false;
}

function removeSiteFromBlocklist(site) {
  let list = loadBlocklist();
  const index = list.indexOf(site);
  if (index !== -1) {
    list.splice(index, 1);
    saveBlocklist(list);
    return true;
  }
  return false;
}

function enableBlocking() {
  try {
    let hostsContent = fs.readFileSync(HOSTS_FILE, 'utf8');
    
    // If it's already blocked, clean it first
    if (hostsContent.includes(START_MARKER)) {
      disableBlocking();
      hostsContent = fs.readFileSync(HOSTS_FILE, 'utf8');
    }
    
    const list = loadBlocklist();
    const blockText = [
      '',
      START_MARKER,
      ...list.map(site => `127.0.0.1 ${site}`),
      END_MARKER,
      ''
    ].join(os.EOL);
    
    fs.appendFileSync(HOSTS_FILE, blockText);
    console.log(`\n[\u2713] Distracting sites blocked in hosts file.`);
  } catch (error) {
    if (error.code === 'EACCES' || error.code === 'EPERM') {
      console.error(`\n[!] Error: Access Denied to ${HOSTS_FILE}.`);
      console.error('    Please run the terminal as Administrator to allow website blocking.\n');
      process.exit(1);
    } else {
      console.error(`\n[!] Failed to modify hosts file: ${error.message}`);
    }
  }
}

function disableBlocking() {
  try {
    let hostsContent = fs.readFileSync(HOSTS_FILE, 'utf8');
    
    if (!hostsContent.includes(START_MARKER)) return; // Nothing to remove
    
    const regex = new RegExp(`[\\r\\n]*${START_MARKER}[\\s\\S]*?${END_MARKER}[\\r\\n]*`, 'g');
    hostsContent = hostsContent.replace(regex, os.EOL);
    
    fs.writeFileSync(HOSTS_FILE, hostsContent);
    console.log(`\n[\u2713] Distracting sites unblocked.`);
  } catch (error) {
    if (error.code === 'EACCES' || error.code === 'EPERM') {
      console.error(`\n[!] Error: Access Denied to ${HOSTS_FILE}.`);
      console.error('    Please run the terminal as Administrator to unblock websites.\n');
    } else {
      console.error(`\n[!] Failed to restore hosts file: ${error.message}`);
    }
  }
}

module.exports = {
  enableBlocking,
  disableBlocking,
  addSiteToBlocklist,
  removeSiteFromBlocklist,
  loadBlocklist
};
