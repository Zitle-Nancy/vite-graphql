interface AllPersonsProps {
  name: string;
}

interface PersonsProps {
  data: {
    allPersons: AllPersonsProps[];
  };
}
export const Persons = ({ data }: PersonsProps) => {
  return (
    <ul>
      {data &&
        data.allPersons.map((person, index) => {
          return <li key={index}>{person.name}</li>;
        })}
    </ul>
  );
};
