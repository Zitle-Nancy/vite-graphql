import { useSearchPerson } from "../../hooks/useSearchPerson";
import { CreatePersonForm } from "./form/CreatePerson";
import { PersonDetail } from "./PersonDetail";

interface Address {
  city: string;
  street: string;
}

export interface Person {
  name: string;
  phone?: string;
  address: Address;
}

interface PersonProps {
  data: {
    allPersons: Person[];
  };
}

export const Persons = ({ data }: PersonProps) => {
  const { person, searchPerson, setPerson } = useSearchPerson();
  if (!data) {
    return null;
  }

  if (person) {
    return <PersonDetail person={person} onClose={setPerson} />;
  }

  return (
    <>
      <h1>Persons</h1>
      <ul>
        {data.allPersons.map(({ name, phone }, index: number) => {
          return (
            <li
              style={{ margin: "10px 0" }}
              key={index}
              onClick={() => searchPerson(name)}
            >
              <p>Name: {name}</p>
              <p>Phone Number: {phone}</p>
            </li>
          );
        })}
      </ul>
      <CreatePersonForm />
    </>
  );
};
