import { useState, useEffect, createContext } from "react";
import { axiosInstance } from "../lib/axiosCall";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const updateUser = async () => {
    try {
      const res = await axiosInstance.get("/api/auth/me");
      console.log("dsfsdfsdf")
      console.log(res)
      // This sends the cookie
      if (res.data.user) {
        setUser(res.data.user);
        setIsUserAuthenticated(true);
      } else {
        setUser(null);
        setIsUserAuthenticated(false);
      }
    } catch (error) {
      setUser(null);
      setIsUserAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <DataContext.Provider value={{ User, setUser, isUserAuthenticated, loading, updateUser }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
