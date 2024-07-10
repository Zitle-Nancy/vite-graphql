import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FIND_PERSON } from "../graphql/queries";
import { Person } from "../components/persons/Persons";

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
