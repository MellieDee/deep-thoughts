const { gql } = require('apollo-server-express');
// query  thoughts w/ Para username if wanted to, dont have to set up to do w or w/o. DOnt forget to update matching resolver funct

//running thought Q also lists rxn field

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
  reactionBody: String
  createdAt: String
  username: String
}

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }
`;

module.exports = typeDefs;
