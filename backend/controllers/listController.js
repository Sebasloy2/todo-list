const List = require('../models/list');

// Create a new to-do list
const createList = async (req, res) => {
  try {
    const newList = new List({
      title: req.body.title,
      createdBy: req.user._id, // Set the user ID as the creator of the list
      collaborators: [req.user._id], // Add the user ID to the collaborators list
    });
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all of the user's to-do lists
const getAllLists = async (req, res) => {
  try {
    const lists = await List.find({ collaborators: req.user._id }).populate('createdBy', 'username');
    res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific to-do list by ID
const getListById = async (req, res) => {
  try {
    const list = await List.findOne({ _id: req.params.id, collaborators: req.user._id }).populate('createdBy', 'username');
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.status(200).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a specific to-do list by ID
const updateList = async (req, res) => {
  try {
    const list = await List.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { $set: req.body },
      { new: true },
    );
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.status(200).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a specific to-do list by ID
const deleteList = async (req, res) => {
  try {
    const list = await List.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.status(200).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createList,
  getAllLists,
  getListById,
  updateList,
  deleteList,
};
