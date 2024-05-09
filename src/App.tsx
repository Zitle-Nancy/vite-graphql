import { gql, useQuery } from "@apollo/client";
import "./App.css";
import { Persons } from "./components";

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      address {
        city
        street
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(ALL_PERSONS);
  if (loading) return <p>loading...</p>;
  if (error) return <p style="color: red">Error</p>;
  return <Persons data={data} />;
}

export default App;
