const { Group, validate } = require('../models/group');
const { Plan } = require('../models/plan');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	const group = await Group.find().sort('-createdAt');
});

router.get('/me', auth, async (req, res) => {
	const group = await Group.find({ members: req.user._id }).populate('leader', 'plan', 'title');

	if (group.length === 0) return res.status(404).send('You are not a member of any group.');

	res.send(group);
});

router.post('/', auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const {leader, members, plan: planId} = req.body;

	const session = await mongoose.startSession(); //to prevent package overbooking (2 users booking at the same time)
	session.startTransaction();

	try {
		const planObj = await Plan.findById(planId);
		if (!planObj) return res.status(404).send('Plan not found');

		if (planObj.type === 'tour') {
			if (planObj.seatsAvailable < members.length)
				return res.status(400).send('Not enough seats available.');

			planObj.seatsAvailable -= members.length;
			await planObj.save();
		}

		const group = new Group({
			type: req.body.type,
			leader: req.body.leader,
			plan: req.body.planId,
			members
		});

		await group.save();
		res.send(group);
	} catch (err) {
		await session.abortTransaction();
		res.status(400).send(err.message);
	} finally {
		session.endSession();
	}
});

router.put('/:id', auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const { leader, members, plan: planId } = req.body;

	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const group = await Group.findById(req.params.id).session(session);
		if (!group) return res.status(404).send('Group not found.');
		
		if (!group.leader.equals(req.user._id))
			return res.status(403).send('Only the leader can update the group.');

		const newPlan = await Plan.findById(planId).session(session);
		if (!newPlan) return res.status(404).send('Plan not found');

		// if plan(tour) is changed, return seats to the old plan
		if (newPlan.type === 'tour') {
			const oldMemberCount = group.members.length;
			const newMemberCount = members.length;
			let seatsNeeded = 0;

			if (!group.plan.equals(planId)) {
				if (group.plan) {
					const oldPlan = await Plan.findById(group.plan).session(session);
					if (oldPlan && oldPlan.type === 'tour') {
						oldPlan.seatsAvailable += group.members.length;
						await oldPlan.save({session});
					}
					seatsNeeded = newMemberCount;
				} else
					seatsNeeded = newMemberCount - oldMemberCount;
			}
		}

		if (newPlan.type === 'tour') {
			if (seatNeeded > 0 && newPlan.seatsAvailable < members.length) 
				return res.status(400).send('Not enough seats available in the new plan.');
			newPlan.seatsAvailable -= members.length;
			await newPlan.save({session})
		}

		const updatedGroup = await Group.findByIdAndUpdate(
			req.params.id,
			{
				leader: leader,
				plan: planId,
				members: members
			},
			{new: true, runValidators: true, session}
		);

		await session.commitTransaction();

		res.send(updatedGroup);
		
	} catch (err) {
		await session.abortTransaction();
		res.status(500).send(err.message);
	} finally {
		session.endSession();
	}
})

router.delete('/:id', auth, async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const group = await Group.findById(req.params.id).session(session);
		if (!group) return res.status(404).send('Group not found.');

		if (!group.leader.equals(req.user._id))
			return res.status(403).send('Only leader allows to delete the group.');

		if (group.plan) {
			const plan = await Plan.findById(group.plan).session(session);
			if (!plan) return res.status(404).send('Plan not found.');
			if (plan.type === 'tour') {
				plan.seatsAvailable += group.members.length;
				await plan.save({session});
			}
		}

		await Group.findByIdAndDelete(req.params.id, {session});

		await session.commitTransaction();

		res.send(group);
		
	} catch (err) {
		await session.abortTransaction();
		res.status(500).send(err.message);
	} finally {
		session.endSession();
	}
})

module.exports = router;

