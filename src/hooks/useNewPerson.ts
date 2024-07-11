import { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_PERSON } from "../graphql/mutations";
import { ALL_PERSONS } from "../graphql/queries";

export const useNewPerson = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // is an array because we say when want to call the useMutation()
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
      setTimeout(() => setErrorMessage(null), 5000);
    },
  });

  return { createPerson, errorMessage };
};
