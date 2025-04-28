
// import { useState, useEffect, createContext } from "react";
// import { jwtDecode } from "jwt-decode";
// import { getAccessToken } from "../lib/utils/authToken";
// import toast from "react-hot-toast";

// export const DataContext = createContext(null);

// const DataProvider = ({ children }) => {
//   const [User, setUser] = useState(null);
//   const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const updateUser = () => {
//     const token = getAccessToken();
//     console.log("ksdsd")
//     console.log(token)
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         if (decoded && decoded._id) {
//           setUser({
//             userId: decoded._id,
//             email: decoded.email,
//           });
//           setIsUserAuthenticated(true);
//         }
//       } catch (error) {
//         toast.error("Server Error");
//       }
//     } else {
//       setUser(null);
//       setIsUserAuthenticated(false);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     updateUser();
//     console.log( "sd"+ User)
//   }, [document.cookie]);

//   return (
//     <DataContext.Provider value={{ User, setUser, isUserAuthenticated, loading, updateUser }}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// export default DataProvider;



import { useState, useEffect, createContext } from "react";
import { axiosInstance } from "../lib/axiosCall";
// import toast from "react-hot-toast";

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
