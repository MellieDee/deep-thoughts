const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth')

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const initServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
    // context: ({ req }) => req.headers //see the incoming request and return only the headers. On the resolver side, those headers would become the context parameter.
    // instead change to authMidWare & every req gets auth check and auth obj passed to resolvers as context
  });
  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

initServer()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
