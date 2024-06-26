import {useEffect} from "react";
import {useFormattedData} from "./useFormatted.ts";
import users from "./users.json";
import "./App.css";
import "./style.scss";

export const App = () => {
  const {formatted, sortBy, filter, search} = useFormattedData(users);
  useEffect(() => {
    search("anderson");
    filter(({ zip }) => zip > 486);
    sortBy("firstName");
  }, []);

  return (
    <div className="container">
      {formatted.length ?
        formatted.map(({id, firstName, lastName, birthdate}) => (
          <div key={id} className="user-item">
            <div>
              Full name: <span>{firstName} {lastName}</span>
            </div>
            <div>Birthdate: <span>{birthdate}</span></div>
          </div>
        ))
        :
        <h2>No results. :/</h2>
      }
    </div>
  );
};
