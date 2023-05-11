const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});

const List = mongoose.model('List', listSchema);

module.exports = List;
