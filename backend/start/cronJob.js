const cron = require('node-cron');
const { Booking } = require('../models/booking');

const bookingCompleted = cron.schedule('0 0 * * *', async () => {
    try {
        const now = new Date();
        const res = await Booking.updateMany(
            {
                lastDay: {$lt: now},
                status: 'confirmed'
            },
            {$set: {status: 'completed'}}
        );

        if (process.env.NODE_ENV !== 'production')
            console.log('Cron Job: Completed booking updated', res.nModified, 'documents modified.');

    } catch (err) {
        console.error('Cron Job Error:', err);
    }
});

const bookingOnTrip = cron.schedule('0 0 * * *', async () => {
    try {
        const now = Date.now();
        const res = await Booking.updateMany(
            {
                firstDay: {$gte: now},
                status: 'confirmed'
            },
            {$set: {status: 'traveling'}}
        );

        if (process.env.NODE_ENV !== 'production')
            console.log('Cron Job: Completed booking updated', res.nModified, 'documents modified.');

    } catch (err) {
        console.error('Cron Job Error:', err);
    }
});

function startJobs() {
    bookingCompleted.start();
    bookingOnTrip.start();

    // if (process.env.NODE_ENV !== 'production')
    //     console.log('Booking status Cron Job started.');
}

module.exports = startJobs;
