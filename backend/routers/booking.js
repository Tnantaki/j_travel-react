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
		schedule: req.body.schedule,
		status: res.body.status,
		paymentStatus: req.body.paymentStatus
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

	res.send({message: 'Succeessfully cancelled the booking.'});
})

router.patch('/pay-booking/:id', auth, async (req, res) => {
	const {error} = validateUpdate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const booking = await Booking.findById(req.params.id).populate('group', 'leader');
	if (!booking) return res.status(404).send('Booking not found.');

	const group = booking.group;
	const isLeader = group.leader.equals(req.user._id);
	if (!isLeader)
		return res.status(403).send('Access denied. You must be the leader of this group');

	const newBooking = await Booking.findByIdAndUpdate(
		req.params._id,
		{
			status: 'confirmed',
			paymentStatus: 'paid'
		}
	)

	res.send({message: 'Successfully made a payment. The booking is now confirmed.'});
})