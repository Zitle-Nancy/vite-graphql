import { FormEvent, useState } from "react";
import { gql } from "@apollo/client";

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
interface PersonPropertiesProps {
  userName: string;
  phone: string;
  address: {
    city: string;
    street: string;
  };
}

export const CreatePersonForm = () => {
  const personProperties: PersonPropertiesProps = {
    userName: "",
    phone: "",
    address: {
      city: "",
      street: "",
    },
  };

  const [newPerson, setNewPerson] =
    useState<PersonPropertiesProps>(personProperties);

  const {
    userName,
    phone,
    address: { city, street },
  } = newPerson;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNewPerson({
      userName: "",
      phone: "",
      address: {
        city: "",
        street: "",
      },
    });
  };

  return (
    <div>
      <h2>Create a new Person</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            id="name"
            placeholder="Name"
            value={userName}
            onChange={({ target: { value } }) => {
              setNewPerson({ ...newPerson, userName: value });
            }}
          />
        </label>

        <label htmlFor="phone">
          Phone:
          <input
            id="phone"
            placeholder="Phone"
            value={phone}
            onChange={({ target: { value } }) => {
              setNewPerson({ ...newPerson, phone: value });
            }}
          />
        </label>
        <label htmlFor="street">
          Street
          <input
            id="street"
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
        <button>Send</button>
      </form>
    </div>
  );
};
