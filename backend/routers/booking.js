const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { Booking, validate, validateUpdate} = require('../models/booking');
const { Group } = require('../models/group');

router.get('/', [auth, admin], async (req, res) => {
	const booking = await Booking.find().sort('createdAt');
	if (!booking) return res.status(404).send('Booking not found.');

	res.send(booking);
});

router.get('/me', auth, async (req, res) => {
	const groups = await Group.find({
		$or: [
			{leader: req.user._id},
			{members: req.user._id}
		]
	});
	if (!groups) return res.status(404).send('No booking.');

	const groupIds = groups.map(group => group._id);

	const bookings = await Booking.find({
		group: {$in: groupIds}
	})
	.populate('plan')
	.populate('group')
	.sort({schedule: -1});

	res.send(bookings);
});

router.post('/', auth, async (req, res) => {
	const {error} = validate(req.body);
	if (!error) return res.status(400).send(error.details[0].message);

	const booking = new Booking ({
		plan: req.body.plan,
		group: req.body.group,
		firstDay:  req.body.firstDay,
		lastDay:  req.body.lastDay,
		status: 'pending',
		paymentStatus: 'unpaid'
	});

	await booking.save();

	res.send(booking);
});

router.put('/:id', auth, async (req, res) => {
	const {error} = validateUpdate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const booking = await Booking.findById(req.params.id).populate('group', 'leader');
	if (!booking) return res.status(404).send('Booking not found.');

	const group = booking.group;
	const isLeader = group.leader.toString() === req.user._id.toString();
	if (!isLeader) 
		return res.status(403).send('Access denied. You must be a leader of this group.');

	const newBooking = await Booking.findByIdAndUpdate(
		req.params.id,
		{$set: req.body},
		{new: true, runValidators: true}
	)

	res.send(newBooking);
});

router.patch('/cancel-booking/:id', auth, async (req, res) => {
	const {error} = validateUpdate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const booking = await Booking.findById(req.params.id).populate('group', 'leader');
	if (!booking) return res.status(404).send('Booking not found.');

	const group = booking.group;
	const isLeader = group.leader.toString() === req.user._id.toString();
	if (!isLeader)
		return res.status(403).send('Access denied. You must be the leader of this group');

	const newBooking = await Booking.findByIdAndUpdate(
		req.params.id,
		{status: 'cancelled'},
		{new: true, runValidators: true}
	)

	res.send({
		message: 'Succeessfully cancelled the booking.',
		booking: newBooking
	});
});

router.patch('/pay-booking/:id', auth, async (req, res) => {
	const booking = await Booking.findById(req.params.id).populate('group', 'leader');
	if (!booking) return res.status(404).send('Booking not found.');

	const group = booking.group;
	const isLeader = group.leader.toString() === req.user._id.toString();
	if (!isLeader)
		return res.status(403).send('Access denied. You must be the leader of this group');

	const newBooking = await Booking.findByIdAndUpdate(
		req.params.id,
		{
			$set: {
				status: 'confirmed',
				paymentStatus: 'paid'
			}
		}
	)
	if (!newBooking)
		return res.status(500).send('Failed to update booking.');

	res.send({
		message: 'Successfully made a payment. The booking is now confirmed.',
		booking: newBooking
	});
});

router.delete('/:id', [auth, admin], async (req, res) => {
	const booking = await Booking.findById(req.params.id);
	if (!booking) return res.status(404).send('Booking not found.');

	if (booking.status !== 'cancelled' || booking.status !== 'completed') 
		return res.status(403).send('You cannot delete this booking.');

	await Booking.deleteOne(booking);
	
	res.send(booking);
});

router.delete('/delete-bookings', [auth, admin], async (req, res) => {
	const {ids} = req.body;
	if (!Array.isArray(ids) || ids.length === 0)
		return res.status(400).send('Please provide an array of booking IDs to delete.');

	const booking = await Booking.find({_id: {$in: ids}});
	if (!booking) return res.status(404).send('Booking not found.');

	for (id in ids) {
		if (booking.status !== 'cancelled' || booking.status !== 'completed') 
			return res.status(403).send('You cannot delete this booking.');
	}

	await Booking.deleteMany({ _id: { $in: ids } });

	res.send({ deletedCount: booking.deletedCount });

})

module.exports = router;