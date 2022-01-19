import BookList from "./components/BookList"
import AddBook from "./components/AddBook"
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from "@apollo/client";

const client = new ApolloClient({
  uri:"http://localhost:5000/graphql",
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client} >
      <div className="main">
        <h1>Books List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
