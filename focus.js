#!/usr/bin/env node

const { enableBlocking, disableBlocking, addSiteToBlocklist, removeSiteFromBlocklist, loadBlocklist } = require('./hostsManager');
const { startTimer } = require('./timer');
const { generateReport } = require('./tracker');

const args = process.argv.slice(2);
const command = args[0];

function showHelp() {
  console.log(`
\x1b[36m\x1b[1mFocus CLI - Hyperfocus Assistant\x1b[0m

Usage:
  node focus.js start <minutes>   Starts a focus session and blocks distracting sites.
  node focus.js stop              Stops the current session and unblocks sites (used if timer crashed/stopped).
  node focus.js report            Shows weekly concentration hours.
  node focus.js block <url>       Adds a site to the blocklist.
  node focus.js unblock <url>     Removes a site from the blocklist.
  node focus.js list              View your current blocklist.

Examples:
  node focus.js start 25
  node focus.js block reddit.com
  node focus.js report
`);
}

switch (command) {
  case 'start':
    const minutes = parseInt(args[1], 10);
    if (!minutes || isNaN(minutes)) {
      console.error('\x1b[31m[!] Please specify valid minutes.\x1b[0m Example: node focus.js start 25');
      process.exit(1);
    }
    enableBlocking();
    startTimer(minutes);
    break;

  case 'stop':
    disableBlocking();
    console.log('\n\x1b[32mSites unblocked explicitly.\x1b[0m');
    break;

  case 'report':
    generateReport();
    break;

  case 'block':
    const siteToAdd = args[1];
    if (!siteToAdd) {
      console.error('\x1b[31m[!] Please specify a URL.\x1b[0m Example: node focus.js block twitter.com');
      process.exit(1);
    }
    if (addSiteToBlocklist(siteToAdd)) {
      console.log(`\x1b[32mAdded ${siteToAdd} to the blocklist.\x1b[0m`);
    } else {
      console.log(`${siteToAdd} is already in the blocklist.`);
    }
    break;

  case 'unblock':
    const siteToRemove = args[1];
    if (!siteToRemove) {
      console.error('\x1b[31m[!] Please specify a URL.\x1b[0m Example: node focus.js unblock twitter.com');
      process.exit(1);
    }
    if (removeSiteFromBlocklist(siteToRemove)) {
      console.log(`\x1b[32mRemoved ${siteToRemove} from the blocklist.\x1b[0m`);
    } else {
      console.log(`${siteToRemove} was not in the blocklist.`);
    }
    break;

  case 'list':
    console.log('\n\x1b[1mCurrent Distraction Blocklist:\x1b[0m');
    loadBlocklist().forEach(site => console.log(` - ${site}`));
    console.log('');
    break;

  default:
    showHelp();
    break;
}
