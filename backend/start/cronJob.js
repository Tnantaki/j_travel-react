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
            
        )
    } catch (err) {

    }

});
