const express = require('express');
const router = express.Router();
const List = require('../models/List');
const auth = require('../middleware/auth');

// Get all lists for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const lists = await List.find({ owner: req.user._id });
    res.send(lists);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new list for the authenticated user
router.post('/', auth, async (req, res) => {
  const list = new List({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await list.save();
    res.status(201).send(list);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a list for the authenticated user
router.patch('/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description', 'items'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const list = await List.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!list) {
      return res.status(404).send();
    }

    updates.forEach((update) => (list[update] = req.body[update]));
    await list.save();
    res.send(list);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a list for the authenticated user
router.delete('/:id', auth, async (req, res) => {
  try {
    const list = await List.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!list) {
      return res.status(404).send();
    }

    res.send(list);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
