const { gql } = require('apollo-server-express');
// query  thoughts w/ Para username if wanted to, dont have to set up to do w or w/o. DOnt forget to update matching resolver funct

//running thought Q also lists rxn field

// 2 mutations login() & add; both return User{}, but want secure so return Auth instead

// set BE to look for token with me Q

//addReaction() returns parent Thought instead of the newly created Reaction because FE tracks track changes on the thought level, not the reaction level.

const typeDefs = gql`

type User {
  _id: ID
  username: String
  email: String
  friendCount: Int
  thoughts: [Thought]
  friends: [User]
}

type Thought {
  _id: ID
  thoughtText: String
  createdAt: String
  username: String
  reactionCount: Int
  reactions: [Reaction]
}

type Reaction {
  _id: ID
  reactionText: String
  createdAt: String
  username: String
}

type Query {
  me: User
  users: [User]
  user(username: String!): User
  thoughts(username: String): [Thought]
  thought(_id: ID!): Thought
  }

type Auth {
  token: ID!
  user: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  addThought(thoughtText: String!): Thought
  addReaction(thoughtId: ID!, reactionText: String!): Thought
  addFriend(friendId: ID!): User
}
`;

module.exports = typeDefs;
