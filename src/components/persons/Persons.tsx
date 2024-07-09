import { useSearchPerson } from "../../queries/searchPerson";
import { CreatePersonForm } from "./form/CreatePerson";
import { PersonDetail } from "./PersonDetail";

//$name: String!, $street:String!, $city:String!, $phone:String

interface AllPersons {
  name: string;
  phone: string;
  address?: {
    city?: string;
    street?: string;
  };
}
interface PersonProps {
  data: {
    allPersons: AllPersons[];
  };
}

export const Persons = ({ data }: PersonProps) => {
  const { person, searchPerson, setPerson } = useSearchPerson();
  if (!data) {
    return null;
  }

  if (person) {
    return <PersonDetail person={person} onClose={setPerson} />;
  }

  return (
    <>
      <h1>Persons</h1>
      <ul>
        {data.allPersons.map(({ name }, index: number) => {
          return (
            <li
              style={{ margin: "10px 0" }}
              key={index}
              onClick={() => searchPerson(name)}
            >
              {name}
            </li>
          );
        })}
      </ul>
      <CreatePersonForm />
    </>
  );
};
