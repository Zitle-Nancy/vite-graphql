import { FormEvent, useEffect, useState } from "react";

import { ErrorAlert } from "../../Alert/ErrorAlert";
import { useUpdatePhone } from "../../../hooks/useUpdatePhone";

const initialPersonState = {
  name: "",
  phone: "",
};

export const UpdatePhoneForm = () => {
  const [personData, setPersonData] = useState(initialPersonState);

  const { updatePhone, errorMessage, result, setErrorMessage } =
    useUpdatePhone();

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      console.log("Person Not Found");
      setErrorMessage("Person Not Found");
    }
  }, [result.data, setErrorMessage]);

  const { name, phone } = personData;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await updatePhone({
        variables: {
          ...personData,
        },
      });

      setPersonData(initialPersonState);
    } catch (e) {
      console.error("Error creating person", e);
    }
  };

  return (
    <div>
      {errorMessage ? <ErrorAlert errorMessage={errorMessage} /> : null}
      <h2>Edit phone number</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={({ target: { value } }) => {
              setPersonData({ ...personData, name: value });
            }}
          />
        </label>

        <label htmlFor="phone">
          Phone:
          <input
            id="phone"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={({ target: { value } }) => {
              setPersonData({ ...personData, phone: value });
            }}
          />
        </label>
        <button>Edit</button>
      </form>
    </div>
  );
};
