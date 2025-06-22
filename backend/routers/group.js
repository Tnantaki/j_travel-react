const { Group, validate } = require('../models/group');
const { Plan } = require('../models/plan');
const mongoose = require('mongoose');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const validateDelete = require('../middlewares/validateDelete');
const express = require('express');
const { Profile } = require('../models/profile');
const router = express.Router();

router.get('/', [auth, admin], async (req, res) => {
	const group = await Group.find().sort('-createdAt');

	res.send(group);
});

router.get('/me', auth, async (req, res) => {
		const profile = await Profile.findOne({user: req.user._id});
		if (!profile) res.status(404).send('Your profile does not exist.');

		const isLeader = await Group.find({leader: profile._id})
			.populate('leader', 'user username birthday gender phone')
			.populate('members', 'user username birthday gender phone')

		const leaderCount = isLeader.length;
		


		const isMembers = await Group.find({members: profile._id})
			.populate('leader', 'user username birthday gender phone')
			.populate('members', 'user username birthday gender phone')
		const memberCount = isMembers.length;
		

		res.send({
			'total leader': leaderCount > 0 
			? leaderCount
			: 'You are not a leader of any group',
			'leaderGroups': isLeader,
			'total member': memberCount > 0
			? memberCount
			: 'You are not a member of any group',
			'memberGroup': isMembers}
		)
});

router.post('/', auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const {members, plan: planId} = req.body;

	const session = await mongoose.startSession(); //to prevent package overbooking (2 users booking at the same time)

	try {
		session.startTransaction();

		const planObj = await Plan.findById(planId);
		if (!planObj) return res.status(404).send('Plan not found');

		if (planObj.type === 'tour') {
			if (planObj.seatsAvailable < members.length)
				return res.status(400).send('Not enough seats available.');

			planObj.seatsAvailable -= members.length;
			await planObj.save();
		}

		const leaderProfile = await Profile.findOne({user: req.user._id}).select('_id');
		if (!leaderProfile) return res.status(404).send('Leader Id does not exist.');

		const memberProfiles = await Profile.find({_id: {$in: members}}).select('_id');
		if (!memberProfiles || memberProfiles.length === 0) 
			return res.status(404).send('Invalid members.');

		const group = new Group({
			leader: leaderProfile,
			plan: planId,
			members: memberProfiles
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

router.post('/leave/:id', auth, async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const group = await Group.findById(req.params.id).session(session);
		if (!group) return res.status(404).send(error.details[0].message);

		const userId = req.user._id;
		
		const memberIndex = group.members.findIndex(memberId => 
			memberId.equals(userId)
		);
		if (memberIndex === -1) 
			return res.status(400).send('You are not a member of this group.');

		if (group.leader.equals(userId))
			return res.status(400).send('Leader cannot leave unless transfer leadership or delete the group.');

		group.members.splice(memberIndex);

		if (group.plan) {
			const plan = await Plan.findById(group.plan).session(session);
			if (!plan) return res.status(404).send(error.details[0].message);

			if (plan.type === 'tour') {
				plan.seatsAvailable += 1;
				await plan.save(session)
			}
		}

		await group.save(session);

		await session.commitTransaction();
		res.status(200).send({mesage: 'Successfully left the group:', group});

	} catch (err) {
		await session.abortTransaction();
		res.status(500).send('An error occurred: ' + err.message);
	} finally {
		session.endSession();
	}
});

router.post('/transfer-leadership', auth, async (req, res) => {
	const {groupId, newLeaderId} = req.body;

	if (!groupId || !newLeaderId || typeof id !== 'string' 
		|| typeof groupId !== 'string' || typeof newLeaderId !== 'string')
		return res.status(400).send('Invalid request.');

	const group = await Group.findById(id);
	if (!group) return res.status(400).send('Group not found.');

	const userId = req.user._id;
	if (!group.leader.equals(userId))
		return res.status(400).send('Only leader can transfer leadership.');

	if (group.members.length < 2) 
		return res.status(400).send('Must have at least 2 members to transfer a leadership.');

	const isNewleaderMemeber = group.members.some(memberId => memberId.equals(newLeaderId));
	if (!isNewleaderMemeber)
		return res.status(400).send('The new leader must be a current of the group');

	const oldLeaderId = group.leader;
	group.leader = newLeaderId;

	group.members = group.members.filter(memberId => !memberId.equal(newLeaderId));

	group.members.push(oldLeaderId);

	await group.save();

	res.status(200).send('Transfer of leadership completed');
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
				$set: {
					leader: leader,
					plan: planId,
					members: members
				}
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

router.delete('/delete-groups', [auth, admin, validateDelete], async (req, res) => {
	const {ids} = req.body;
	if (!Array.isArray(ids) || ids.length === 0)
		return res.status(404).send('Please provide an array of group IDs to delete.');

	const session = await mongoose.startSession();
	session.startTransaction();

	try { 
		const groups = await Group.find({_id: {$in: ids}}).session(session);
		if (groups.length === 0) 
			return res.status(400).send('No groups found with the provided IDs.');

		const planIds = groups.map(group => group.plan).filter(Boolean);
		if (planIds.length > 0) {
			const plans = await Plan.find({_id: {$in: planIds}}).session(session);
			const planMap = {};
			plans.forEach(plan => {
				planMap[plan._id.toString()] = plan;
			});

			for (const group of groups) {
				if (!group.plan) continue;

				const plan = planMap[group.plan.toString()];
				if (plan && plan.type === 'tour') {
					plan.seatsAvailable += groups.members.length;
					await plan.save();
				}
			}
		}

		await Group.deleteMany({_id: {$in: ids}}).session(session);

		await session.commitTransaction();
		res.status(200).send({message: `Successfully deleted ${groups.length} groups`});

	} catch (err) {
		await session.abortTransaction();
		res.status(500).send('An error occurred' + err.message) 
	} finally {
		session.endSession();
	}
});

module.exports = router;

