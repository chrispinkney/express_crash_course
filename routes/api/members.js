const express = require('express');
const uuid = require('uuid');
const members = require('../../Members');
const router = express.Router();

// This route gets all members
router.get('/', (req, res) => res.json(members));

// This route gets a single member - uses :id to get a single member
router.get('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id)); //some will return true or false if the condition is true (i.e. if the member exists)

  if (found) {
    //if ok, return member
    res.json(members.filter((member) => member.id === parseInt(req.params.id))); //filter high order function will filter the array given a condition. === makes something a string, so use parseInt to get the actual int.
  } else {
    res.status(400).json({ msg: `Member not found with id: ${req.params.id}` });
  }
});

// This route creates a member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active',
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: `Please include a name and email` });
  }
  members.push(newMember);
  res.json({ members });
  //res.redirect('/');
});

// Update member
router.put('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id)); //some will return true or false if the condition is true (i.e. if the member exists)

  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        // if member is found, update if necessary
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;
        res.json({ msg: 'Member updated', member });
      }
    }); //search for member
  } else {
    res.status(400).json({ msg: `Member not found with id: ${req.params.id}` });
  }
});

// Delete member
router.delete('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id)); //some will return true or false if the condition is true (i.e. if the member exists)

  if (found) {
    //if ok, delete
    res.json({
      msg: 'Member delete',
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    }); //filter high order function will filter the array given a condition. === makes something a string, so use parseInt to get the actual int.
  } else {
    res.status(400).json({ msg: `Member not found with id: ${req.params.id}` });
  }
});

module.exports = router;
