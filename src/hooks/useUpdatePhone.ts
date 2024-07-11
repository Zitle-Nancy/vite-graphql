import { useState } from "react";
import { useMutation } from "@apollo/client";

import { UPDATE_PHONE } from "../graphql/mutations";
import { ALL_PERSONS } from "../graphql/queries";

export const useUpdatePhone = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // is an array because we say when want to call the useMutation()
  const [updatePhone, result] = useMutation(UPDATE_PHONE, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message);
      setTimeout(() => setErrorMessage(null), 5000);
    },
  });

  return { updatePhone, errorMessage, result, setErrorMessage };
};
