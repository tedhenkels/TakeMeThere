import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const values = { user, setUser };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContext;
