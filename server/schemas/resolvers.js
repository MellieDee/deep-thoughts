const { User, Thought } = require('../models');
const { AuthenticationError } = require('apollo-server-express'); // built in error handling
const { signToken } = require('../utils/auth');
const { sign } = require('jsonwebtoken');

//pass parent as  placeholder parameter.  won't be used, but  need something in 1st param spot para so can access username arg from 2nd param.
//then pass that obj var to fund()
const resolvers = {
  Query: {

    // ME
    me: async (parent, args, context) => {

      if (context.user) {

        const userData = await User.findOne({})
          .select('-__v -password')
          .populate('thoughts')
          .populate('friends')

        return userData
      }

      throw new AuthenticationError('Not logged in');
    },

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

  },
  //Mongoose User model creates new user in DB w/ whatever is passed as args.
  // Set up to sign the token:
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user)
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect Credentials');
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user)
      return { token, user };
    },

    //Only logged-in users should be able to use this mutation, hence why we check for the existence of context.user first. Remember, the decoded JWT is only added to context if the verification passes. The token includes the user's username, email, and _id properties, which become properties of context.user and can be used in the follow-up Thought.create() and User.findByIdAndUpdate() methods.
    addThought: async (parent, args, context) => {
      if (context.user) {
        const thought = await Thought.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { thoughts: thought._id } },
          { new: true } //Mongo would return old doc w/o "new"
        );

        return thought;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }

}

module.exports = resolvers;