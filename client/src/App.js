import React from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';


// estab new link to GraphQL server at /graphql endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

//used constructor funct ApolloClient to instantiate Apollo Client instance and create connection to the endpoint
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
//enable WHOLE app to use Apollo Client;
//wrap whole App in ApolloProvider & the {client} var is the value for client prop in the provider
// so everything in JSX will have access to servers API data through the Client
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
