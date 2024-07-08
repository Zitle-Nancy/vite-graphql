import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

interface Address {
  street?: string;
  city?: string;
}
export interface Person {
  name: string;
  phone: string;
  id: string;
  address: Address;
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

export const useSearchPerson = () => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON);
  const [person, setPerson] = useState<Person | null>(null);

  const searchPerson = (name: string) => {
    getPerson({ variables: { nameToSearch: name } });
  };

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson);
    }
  }, [result]);

  return {
    person,
    searchPerson,
    setPerson,
  };
};
