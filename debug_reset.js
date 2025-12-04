// Based on screenshot at 11:12 EST (16:12 UTC) on Dec 4, 2025:
// Onyxia: 0d 11h 47m -> resets at 16:12 + 11:47 = 03:59 UTC = Dec 5, 2025 ~04:00 UTC
// But the website says "Resets every 5 days" and reset time is 02:00 UTC
// So the actual reset is Dec 5, 2025 02:00 UTC
// Wait... 16:12 + 11:47 = 27:59 = 03:59 next day
// That's Dec 5 03:59 UTC, not 02:00 UTC

// Let me recalculate:
// Current: Dec 4, 2025 16:12 UTC
// Onyxia timer: 11h 47m
// Reset at: Dec 4 16:12 + 11:47 = Dec 5 03:59 UTC

// Hmm, but resets should be at 02:00 UTC. Let me check if the reset time is different.
// Maybe it's 04:00 UTC?

const { add, parseISO } = require('date-fns');

const now = parseISO('2025-12-04T16:12:00Z'); // Current time in UTC

// From screenshot:
// Onyxia: 0d 11h 47m
const onyxiaOffset = { hours: 11, minutes: 47 };
const onyxiaReset = add(now, onyxiaOffset);

console.log('Onyxia reset calculated:', onyxiaReset.toISOString());
console.log('Expected: Dec 5, 2025 04:00:00 UTC');

// If reset is at 04:00 UTC, then:
// - Onyxia (5 day): Dec 5 04:00, Dec 10 04:00, etc.
// - Raid 40 (7 day): ?
// - Raid 20 (3 day): ?
