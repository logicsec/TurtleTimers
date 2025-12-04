const { addDays, differenceInSeconds, parseISO } = require('date-fns');

// Anchors based on 04:00 UTC reset time
// Calculated from website data on Dec 4, 2025 16:12 UTC:
// Onyxia showed 11h 47m -> resets Dec 5, 2025 04:00 UTC
const ANCHORS = {
    // 40-man raids (7 day reset)
    'Raid 40': {
        date: '2025-12-10T04:00:00Z',
        intervalDays: 7
    },
    'MC': {
        date: '2025-12-10T04:00:00Z',
        intervalDays: 7
    },
    'Molten Core': {
        date: '2025-12-10T04:00:00Z',
        intervalDays: 7
    },
    'BWL': {
        date: '2025-12-10T04:00:00Z',
        intervalDays: 7
    },
    'Blackwing Lair': {
        date: '2025-12-10T04:00:00Z',
        intervalDays: 7
    },
    'AQ40': {
        date: '2025-12-10T04:00:00Z',
        intervalDays: 7
    },
    'Naxx': {
        date: '2025-12-10T04:00:00Z',
        intervalDays: 7
    },
    'Naxxramas': {
        date: '2025-12-10T04:00:00Z',
        intervalDays: 7
    },
    'ES': {
        date: '2025-12-10T04:00:00Z',
        intervalDays: 7
    },
    'Emerald Sanctum': {
        date: '2025-12-10T04:00:00Z',
        intervalDays: 7
    },
    // Onyxia (5 day reset)
    'Onyxia': {
        date: '2025-12-05T04:00:00Z',
        intervalDays: 5
    },
    // Karazhan (5 day reset)
    'Karazhan': {
        date: '2025-12-05T04:00:00Z',
        intervalDays: 5
    },
    'Kara': {
        date: '2025-12-05T04:00:00Z',
        intervalDays: 5
    },
    'Upper Karazhan': {
        date: '2025-12-06T04:00:00Z',
        intervalDays: 5
    },
    'Lower Karazhan': {
        date: '2025-12-06T04:00:00Z',
        intervalDays: 5
    },
    // 20-man raids (3 day reset)
    'Raid 20': {
        date: '2025-12-07T04:00:00Z',
        intervalDays: 3
    },
    'ZG': {
        date: '2025-12-07T04:00:00Z',
        intervalDays: 3
    },
    'Zul\'Gurub': {
        date: '2025-12-07T04:00:00Z',
        intervalDays: 3
    },
    'AQ20': {
        date: '2025-12-07T04:00:00Z',
        intervalDays: 3
    },
    'Ruins of Ahn\'Qiraj': {
        date: '2025-12-07T04:00:00Z',
        intervalDays: 3
    }

};

function getNextReset(raidName) {
    const anchor = ANCHORS[raidName];
    if (!anchor) return null;

    const anchorDate = parseISO(anchor.date);
    const now = new Date();

    // Calculate difference in days
    // We want to find k such that anchor + k * interval > now
    // But since we have a future anchor (Dec 2025), we might need to go backwards if we run this in the future?
    // Actually, the user's time is Dec 2025. So these are current.

    let nextReset = anchorDate;

    // If anchor is in the past, add intervals until future
    while (nextReset <= now) {
        nextReset = addDays(nextReset, anchor.intervalDays);
    }

    // If anchor is too far in the future (more than one interval), subtract intervals
    // (This handles if we hardcoded a date far in the future but run it earlier)
    while (differenceInSeconds(nextReset, now) > anchor.intervalDays * 86400) {
        const prevReset = addDays(nextReset, -anchor.intervalDays);
        if (prevReset <= now) break; // Don't go into the past
        nextReset = prevReset;
    }

    return nextReset;
}

function getTimeRemaining(raidName) {
    const nextReset = getNextReset(raidName);
    if (!nextReset) return null;

    const now = new Date();
    const diffSeconds = differenceInSeconds(nextReset, now);

    const days = Math.floor(diffSeconds / (3600 * 24));
    const hours = Math.floor((diffSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((diffSeconds % 3600) / 60);
    const seconds = diffSeconds % 60;

    return {
        days,
        hours,
        minutes,
        seconds,
        nextReset
    };
}

module.exports = {
    getNextReset,
    getTimeRemaining,
    ANCHORS
};
