import "./App.css";
import { Persons } from "./components";
import { usePerson } from "./hooks/usePerson";

const App = () => {
  const { data, loading, error } = usePerson();

  if (loading) return <p>loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error</p>;
  return <Persons data={data} />;
};

export default App;
