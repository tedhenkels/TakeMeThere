import { useContext } from "react";
import userContext from "../../UserContext";

export const UserPage = () => {
  const { user } = useContext(userContext);

  return <h1>Hi {user?.first_name}</h1>;
};
