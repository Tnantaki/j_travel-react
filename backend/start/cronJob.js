const cron = require('node-cron');
const { Booking } = require('../models/booking');

const bookingStatusJob = cron.schedule('0 0 * * *', async () => {
    try {
        const now = new Date();
        const res = await Booking.updateMany(
            {
                lastDay: {$lt: now},
                status: 'confirmed'
            },
            {$set: {status: 'completed'}}
        );
        if (NODE_ENV !== 'production')
            console.log('Cron Job: Completed booking updated', res.nModified, 'documents modified.');
    } catch (err) {
        console.error('Cron Job Error:', err);
    }
});

function startJob() {
    bookingStatusJob.start();
    if (NODE_ENV !== 'production')
        console.log('Booking status Cron Job started.');

}
