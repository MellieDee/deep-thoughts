import React from 'react';
import { useQuery } from '@apollo/client'; //importing useQuery hook from Apollo Client so can make req to Gql server we are connected to and avail bcuz ApolloProvider in App.js
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';


const Home = () => {

  //useQuery hook to make req
  // Apollo's @apollo/client library provides a loading property to indicate that the request isn't done just yet. When it's finished and data returned from the server, that information is stored in the destructured data property. loading allows us to conditionally render if there is data, and not render if there is not data.

  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts}
              title="Some fee for Thought..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
