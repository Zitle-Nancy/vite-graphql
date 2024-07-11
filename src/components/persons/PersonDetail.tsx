import { Dispatch, SetStateAction } from "react";
import { Person } from "./Persons";

interface PersonDetailProps {
  person: Person;
  onClose: Dispatch<SetStateAction<Person | null>>;
}

export const PersonDetail = ({
  person: { name, phone, address },
  onClose,
}: PersonDetailProps) => {
  return (
    <div>
      <h2>
        <strong>Name: </strong> {name}
      </h2>
      <p>
        <strong>Phone: </strong> {phone}
      </p>
      <p>
        <strong>Ciudad: </strong>
        {address?.city}{" "}
      </p>
      <p>
        <strong>Dirección: </strong>
        {address?.street}
      </p>
      <button onClick={() => onClose(null)}>Close</button>
    </div>
  );
};
