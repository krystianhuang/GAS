var express = require('express');
var router = express.Router();
var db = require('../database');
/* GET Topics listing. */
router.get('/', function (req, res, next) {
	const topicRef = db.ref('topics/');
	topicRef.once('value')
		.then(data=> {
			const topicArr = [];
			data = data.val();
			for (let key of Object.keys(data)) {
				let topic = data[key];
				topic.id = key;
				topicArr.push(topic);
			}
			res.send(topicArr);
		});
});

/* ADD New Topic */
router.post('/', function (req, res, next) {
	const topicRef = db.ref('topics/');
	const topic = {
		backend : {
			"minNumber" : req.body.backend.minNumber,
			"skills" : req.body.backend.skills,
		},
		frontend : {
			"minNumber" : req.body.frontend.minNumber,
			"skills" : req.body.frontend.skills,
		},
		maxNumber : req.body.maxNumber,
		name : req.body.name
	};
	const newTopic = topicRef.push(topic);
	res.send(newTopic.key);
});

router.delete('/', function (req, res, next) {
	const skillRef = db.ref('skills/');
	skillRef.once('value')
		.then(currentSkills=>{
			let skills = currentSkills.val();
			if(skills.includes(req.body.skill)){
				skills = skills.filter(topic=> topic !== req.body.skill);
			}
			skillRef.set(skills);
			res.send(skills);
		});
});

router.post('/:topicId/groups', function (req, res, next) {
	const topicRef = db.ref('topics/' + req.params.topicId);
	const topicGroupsRef = db.ref('topics/' + req.params.topicId+'/groups');
	const topicCandidatesRef = db.ref('topics/' + req.params.topicId+'/candidates');
	topicRef.once('value')
		.then(data=>{
			let topic = data.val();
			let candidates = topic.candidates;
			let groupId;
			if(!topic.groups) {
				groupId = 1;
			} else {
				groupId = Object.keys(topic.groups).length + 1;
			}
			for(let i in req.body){
				let group = req.body[i];
				let newGroup = {};
				newGroup.id = groupId++;
				newGroup.name = group.groupName;
				newGroup.members = [];
				for(let m in group.members){
					let memberId = group.members[m];
					for(let c in candidates){
						let candidate = candidates[c];
						if(memberId === candidate.user.id) {
							candidate.user.role=candidate.role;
							newGroup.members.push(candidate.user);
							candidate.grouped = true;
							break;
						}
					}
				}
				topicGroupsRef.push(newGroup);
				const leftCandidates = candidates.filter(c=>!c.grouped);
				topicCandidatesRef.set(leftCandidates);
			}
			res.send({result: "success"});
		});
});


module.exports = router;

