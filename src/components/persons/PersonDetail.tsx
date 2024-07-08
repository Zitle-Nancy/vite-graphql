import { Dispatch, SetStateAction } from "react";
import { Person } from "../../queries/searchPerson";

interface Address {
  city?: string;
  street?: string;
}

interface PersonDetailProps {
  person: {
    name: string;
    phone: string;
    address?: Address;
  };
  onClose: Dispatch<SetStateAction<Person | null>>;
}

export const PersonDetail = ({
  person: { name, phone, address },
  onClose,
}: PersonDetailProps) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{phone}</p>
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
