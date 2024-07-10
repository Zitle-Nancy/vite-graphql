import { useMutation } from "@apollo/client";

import { CREATE_PERSON } from "../graphql/mutations";
import { ALL_PERSONS } from "../graphql/queries";

export const useNewPerson = () => {
  // is an array because we say when want to call the useMutation()
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
  });

  return { createPerson };
};
