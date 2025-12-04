const { add, parseISO } = require('date-fns');

// Current time approximation (when the screenshot was taken)
// User time was 10:40:32, subagent ran shortly after. Let's use 10:41:00
const now = parseISO('2025-12-04T10:41:00-05:00'); 

const offsets = {
    'Raid 40': { days: 5, hours: 10, minutes: 18, seconds: 50 },
    'Onyxia': { days: 3, hours: 10, minutes: 18, seconds: 50 },
    'Raid 20': { days: 1, hours: 10, minutes: 18, seconds: 50 },
};

Object.entries(offsets).forEach(([name, duration]) => {
    const resetDate = add(now, duration);
    console.log(`${name} Reset: ${resetDate.toISOString()} (Local)`);
    console.log(`${name} Reset (UTC): ${resetDate.toISOString().replace('-05:00', 'Z')}`); // Rough conversion for display
});
