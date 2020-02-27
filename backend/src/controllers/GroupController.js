const mongoose = require('mongoose');

const Group = mongoose.model('Group');
const fields = '_id createdBy name members';

module.exports = {
  async get(req, res) {
    const data = await Group.find({}, fields);
    return res.json(data);
  },

  async getById(req, res) {
    const data = await Group.findById(req.params.id, fields);
    return res.status(200).json(data);
  },

  async getByUser(req, res) {
    const data = await Group.find({ createdBy: req.params.userId }, fields);
    return res.status(200).json(data);
  },

  async create(req, res) {
    try {
      const group = new Group(req.body);
      await Group.create(group);
      return res.status(200).json({ result: true, message: 'Grupo created' });
    } catch (error) {
      return res
        .status(400)
        .json({ result: false, message: 'Failed to create group', error });
    }
  },

  async delete(req, res) {
    try {
      await Group.findByIdAndDelete(req.params.id);
      return res.status(200).json({ result: true, message: 'Group deleted' });
    } catch (error) {
      return res
        .status(400)
        .json({ result: false, message: 'Failed to delete group', error });
    }
  },

  async addMember(req, res) {
    try {
      const { groupId } = req.params;
      const group = await Group.findById(groupId);
      group.members.push(req.body);

      await Group.findByIdAndUpdate(groupId, group);

      return res
        .status(200)
        .json({ result: true, message: 'Member added to group' });
    } catch (error) {
      return res.status(400).json({
        result: false,
        message: 'Failed to add member to group',
        error
      });
    }
  },

  async deleteMember(req, res) {
    try {
      const { groupId, memberId } = req.params;

      let group = await Group.findById(groupId);
      const members = group.members.filter(item => item.id !== memberId);
      group.members = members;

      await Group.findByIdAndUpdate(groupId, group);
      return res.status(200).json({ result: true, message: 'Member removed' });
    } catch (error) {
      return res.status(400).json({
        result: false,
        message: 'Failed to remove member of group',
        error
      });
    }
  }
};
