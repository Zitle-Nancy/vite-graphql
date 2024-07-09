import { FormEvent, useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { ALL_PERSONS } from "../../../App";

const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(name: $name, phone: $phone, street: $street, city: $city) {
      name
      phone
      address {
        city
        street
      }
      id
    }
  }
`;

// TODO: refactor this interface to global scope
interface PersonProperties {
  name: string;
  phone: string;
  address: {
    city: string;
    street: string;
  };
}

const initialPersonState = {
  name: "",
  phone: "",
  address: {
    city: "",
    street: "",
  },
};

export const CreatePersonForm = () => {
  const [newPerson, setNewPerson] =
    useState<PersonProperties>(initialPersonState);

  // is an array because we say when want to call the useMutation()
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
  });

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
