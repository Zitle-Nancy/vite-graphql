import { FormEvent, useState } from "react";

import { useNewPerson } from "../../../hooks/useNewPerson";
import { Person } from "../Persons";

const initialPersonState: Person = {
  name: "",
  phone: "",
  address: {
    city: "",
    street: "",
  },
};

export const CreatePersonForm = () => {
  const [newPerson, setNewPerson] = useState(initialPersonState);

  const { createPerson } = useNewPerson();

  const {
    name,
    phone,
    address: { city, street },
  } = newPerson;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createPerson({
        variables: {
          ...newPerson,
          ...newPerson.address,
        },
      });

      setNewPerson(initialPersonState);
    } catch (e) {
      console.error("Error creating person", e);
    }
  };

  return (
    <div>
      <h2>Create a new Person</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={({ target: { value } }) => {
              setNewPerson({ ...newPerson, name: value });
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
              setNewPerson({ ...newPerson, phone: value });
            }}
          />
        </label>
        <label htmlFor="street">
          Street:
          <input
            id="street"
            name="street"
            placeholder="Street"
            value={street}
            onChange={({ target: { value } }) => {
              setNewPerson({
                ...newPerson,
                address: { ...newPerson.address, street: value },
              });
            }}
          />
        </label>
        <label htmlFor="city">
          City:
          <input
            id="city"
            name="city"
            placeholder="City"
            value={city}
            onChange={({ target: { value } }) => {
              setNewPerson({
                ...newPerson,
                address: {
                  ...newPerson.address,
                  city: value,
                },
              });
            }}
          />
        </label>
        <button>Add new person</button>
      </form>
    </div>
  );
};
