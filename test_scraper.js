const { getTimeRemaining } = require('./scraper');

const raids = ['Raid 40', 'Onyxia', 'Raid 20', 'Karazhan'];

console.log('--- Verification Test ---');
raids.forEach(raid => {
    const time = getTimeRemaining(raid);
    if (time) {
        console.log(`${raid}: ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`);
        console.log(`   Next Reset: ${time.nextReset.toISOString()}`);
    } else {
        console.log(`${raid}: ERROR (Not found)`);
    }
});
