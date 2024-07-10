import { useQuery } from "@apollo/client";
import { ALL_PERSONS } from "../graphql/queries";

export const usePerson = () => {
  /* useQuery se ejecuta cuando se hace el render, es decir inmediatamente*/
  const { data, loading, error } = useQuery(ALL_PERSONS);
  return { data, loading, error };
};
