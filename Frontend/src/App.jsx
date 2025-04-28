
// import { useContext } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
// import { DataContext } from "./context/DataProvider";
// import SignUp from "./pages/auth/SignUp";
// import Login from "./pages/auth/Login";

// import Home  from "./pages/auth/Home";





// const AuthRoute = () => {
//   const { isUserAuthenticated, loading } = useContext(DataContext);
//   if (loading) return null; 

//   if (!isUserAuthenticated) return <Navigate replace to="/login" />
//   return (
//     <>
//     <Outlet />
//     </>
//   );
// }; 


// const RedirectIfAuthenticated = ({ children }) => {
//   const { isUserAuthenticated, loading } = useContext(DataContext);

//   if (loading) return null; 

//   return isUserAuthenticated ? <Navigate replace to="/" /> : children;
// };

// function App() {

//   return (
//     <Router>
//       <Routes>
//         <Route path="/sign-up" element={<RedirectIfAuthenticated><SignUp /></RedirectIfAuthenticated>} />
//         <Route path="/login" element={<RedirectIfAuthenticated><Login /></RedirectIfAuthenticated>} />

//         <Route element={<AuthRoute />}>
            
//         </Route>
//         <Route path="/" element={< Home />} />

//         {/* <Route path="*" element={<Navigate replace to="/Error" />} /> */}

//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { DataContext } from "./context/DataProvider";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Home from "./pages/auth/Home";

const AuthRoute = () => {
  const { isUserAuthenticated, loading } = useContext(DataContext);

  if (loading) return null; 

  // If the user is not authenticated, redirect them to the login page
  if (!isUserAuthenticated) return <Navigate replace to="/login" />;

  // If authenticated, render the child components inside the Outlet
  return <Outlet />;
};

const RedirectIfAuthenticated = ({ children }) => {
  const { isUserAuthenticated, loading } = useContext(DataContext);

  if (loading) return null; 

  // If the user is already authenticated, redirect them to the home page
  return isUserAuthenticated ? <Navigate replace to="/" /> : children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes for login and sign-up page, only accessible if not authenticated */}
        <Route path="/sign-up" element={<RedirectIfAuthenticated><SignUp /></RedirectIfAuthenticated>} />
        <Route path="/login" element={<RedirectIfAuthenticated><Login /></RedirectIfAuthenticated>} />

        {/* Protected routes */}
        <Route element={<AuthRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* If no route matches, it can redirect to an error page or some fallback */}
        {/* <Route path="*" element={<Navigate replace to="/Error" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
