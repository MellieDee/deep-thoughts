import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

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
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} /><Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
