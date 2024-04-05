import {useState, useEffect} from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: string;
  zip: number;
}

interface FormattedUser {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: string;
}

type FilterFunction = (user: User) => boolean;
type SortFunction = (a: User, b: User) => number;

interface FormattedData {
  formatted: FormattedUser[];
  sortBy: (sortBy: string | SortFunction) => void;
  filter: (filterBy: FilterFunction) => void;
  search: (searchString: string) => void;
}

export const useFormattedData = (initialData: User[]): FormattedData => {
  const [data, setData] = useState<User[]>(initialData);
  const [formatted, setFormatted] = useState<FormattedUser[]>(initialData);

  useEffect(() => {
    setFormatted(data.map(({id, firstName, lastName, birthdate}) => ({id, firstName, lastName, birthdate})));
  }, [data]);

  const sortBy = (sortBy: string | SortFunction) => setData(prevState => {
    const sortedData = [...prevState];

    if (typeof sortBy === "string") {
      sortedData.sort((a, b) => (a[sortBy as keyof User] > b[sortBy as keyof User] ? 1 : -1));
    } else {
      sortedData.sort(sortBy);
    }

    return sortedData;
  });

  const filter = (filterBy: FilterFunction) => setData(prevState => prevState.filter(filterBy));

  const search = (searchString: string) => setData(prevState =>
    prevState.filter(user =>
      Object.values(user)
        .some(value => typeof value === "string" && value.toLowerCase().includes(searchString.toLowerCase())))
  );

  return {formatted, sortBy, filter, search};
};