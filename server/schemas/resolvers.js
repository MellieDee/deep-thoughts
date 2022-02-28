const { User, Thought } = require('../models');

//pass parent as  placeholder parameter.  won't be used, but  need something in 1st param spot para so can access username arg from 2nd param.
//then pass that obj var to fund()
const resolvers = {
  Query: {
    // ALL Users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts')
    },
    // ONE User
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts')
    },
    // ALL Thoughts
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: - 1 }) //data returned in desc order
    },
    // ONE Thought
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    }
  }
};

module.exports = resolvers;