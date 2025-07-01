const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { Booking, validate, validateUpdate} = require('../models/booking');
const { Profile } = require('../models/profile');
const { Group } = require('../models/group');
const { validateId } = require('../middlewares/validateObjId');

router.get('/', [auth, admin], async (req, res) => {
	const booking = await Booking.find().sort('createdAt');
	if (!booking) return res.status(404).send('Booking not found.');

	res.send(booking);
});

router.get('/me', auth, async (req, res) => {
	const profile = await Profile.findOne({user: req.user._id});
	if (!profile) 
		res.status(400).send('User profile not found.');

	const groups = await Group.find({
		$or: [
			{leader: profile._id},
			{members: profile._id}
		]
	})
	if (!groups || groups.length === 0) 
		return res.status(404).send('You are not in a group.');

	const groupIds = groups.map(group => group._id);

	const bookings = await Booking.find({
		group: {$in: groupIds}
	})
	.populate({
		path: 'plan',
		populate: {
			path: 'images',
			select: 'imageUrl fileName caption tag -_id' 
		}
	})
	.populate({
		path: 'group',
		populate: {
			path: 'leader members',
			select: '-address -idNumber -profileImage -passportNumber -user -_id -__v'
		}
		// select: '-__v'
	})
	.select('-__v')
	.sort({schedule: -1});

	res.send(bookings);
});

router.get('/:id', [auth, admin, validateId], async(req, res) => {
	const booking = await Booking.findById(req.params.id)
	.populate({
		path: 'plan',
		populate: {
			path: 'images',
			select: 'imageUrl fileName caption tag -_id' 
		}
	})
	.populate({
		path: 'group',
		populate: {
			path: 'leader members',
			select: '-address -idNumber -profileImage -passportNumber -user -_id -__v'
		}
		// select: '-__v'
	})
	.select('-__v')

	if(!booking) return res.status(400).send('Group not found.');
	
	res.send(booking);
})


router.post('/', auth, async (req, res) => {
	const {error} = validate(req.body);
	if (!error) return res.status(400).send(error.details[0].message);

	const {plan, group: groupId} = req.body;

	const group = await Group.findOne({_id: groupId});
	if (!group) return res.status(400).send('Group not found.');

	const profile = await Profile.findOne({user: req.user._id});
	if(!profile) return res.status(400).send('Profile not found.');

	// make sure that the one who's make the booking
	// belong to the group and is a leader
	if (group.leader.toString() !== profile._id.toString())
		return res.status(400).send('Only leader of the group can make a booking.');

	// make sure that the plan in the booking and group are the same
	if (group.plan.toString() !== plan)
		return res.status(400).send('Group plan and Booking plan has to be the same');

	const booking = new Booking ({
		plan: plan,
		group: groupId,
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

	const booking = await Booking.findById(req.params.id);
	if (!booking) return res.status(404).send('Booking not found.');

	const profile = await Profile.findOne({user: req.user._id});
	if (!profile) res.status(400).send('Profile not found.');

	const group = booking.group;
	const isLeader = group.leader.toString() === profile.user.toString();
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

	const profile = await Profile.findOne({user: req.user._id});
	if (!profile) res.status(400).send('Profile not found.');

	const group = booking.group;
	const isLeader = group.leader.toString() === profile.user.toString();
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

	const profile = await Profile.findOne({user: req.user._id});
	if (!profile) res.status(400).send('Profile not found.');

	const group = booking.group;
	const isLeader = group.leader.toString() === profile.user.toString();
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