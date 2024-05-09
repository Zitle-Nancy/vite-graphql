import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

interface AllPersonsProps {
  name: string;
}

interface PersonsProps {
  data: {
    allPersons: AllPersonsProps[];
  };
}

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

export const Persons = ({ data }: PersonsProps) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON);
  const [person, setPerson] = useState(null);

  const searchPerson = (name: string) => {
    getPerson({ variables: { nameToSearch: name } });
  };

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson);
    }
  }, [result]);

  if (person) {
    const { name, phone, address } = person;
    return (
      <div>
        <h2>{name}</h2>
        <p>{phone}</p>
        <p>
          <strong>Ciudad: </strong>
          {address?.city}{" "}
        </p>
        <p>
          <strong>Dirección: </strong>
          {address?.street}
        </p>
        <button onClick={() => setPerson(null)}>Close</button>
      </div>
    );
  }

  if (data === null) return null;

  return (
    <>
      <h1>Persons</h1>
      <ul>
        {data.allPersons.map((person, index) => {
          return (
            <li
              style={{ margin: "10px 0" }}
              key={index}
              onClick={() => searchPerson(person.name)}
            >
              {person.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};
