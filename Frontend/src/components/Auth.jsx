
import{ useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInUser, signUpUser } from "../api/auth.api";
import toast from "react-hot-toast";
import { DataContext } from "../context/DataProvider";

const AuthForm = ({ isRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    identifier: ""
  });

  const navigate = useNavigate();
    const { updateUser } = useContext(DataContext);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => { 
    e.preventDefault();

    if (isRegister) {
      const response = await signUpUser(formData);
      if (response.success) {
        toast.success("Signup successful! Redirecting...");
        navigate("/login", { replace: true }); 
      } else {
        toast.error(response.message);
      }
    } else {
      const response = await signInUser(formData);
      if (response.success) {
        toast.success(response.message);
        updateUser();

        navigate("/", { replace: true });
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-md">
        {/* Background Cards */}
        <div className="absolute w-full h-full transform -rotate-6 bg-blue-400 rounded-3xl shadow-lg"></div>
        <div className="absolute w-full h-full transform rotate-6 bg-red-400 rounded-3xl shadow-lg"></div>

        {/* Auth Form */}
        <div className="relative bg-gray-100 px-6 py-8 rounded-3xl shadow-md">
          <h2 className="text-center text-2xl font-semibold text-gray-700">
            {isRegister ? "Register" : "Login"}
          </h2>

          <form className="mt-6">
            {/* Name Input (Only for Register) */}
            {isRegister && (
              <div>
                <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 h-11 bg-gray-100 rounded-xl shadow-lg px-4 focus:bg-blue-100 focus:ring-0"
                />
                </div>
               
            <div className="mt-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 h-11 bg-gray-100 rounded-xl shadow-lg px-4 focus:bg-blue-100 focus:ring-0"
                required
              />
            </div>

            <div className="mt-4">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-2 h-11 bg-gray-100 rounded-xl shadow-lg px-4 focus:bg-blue-100 focus:ring-0"
                required
              />
            </div>

            <div className="mt-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-2 h-11 bg-gray-100 rounded-xl shadow-lg px-4 focus:bg-blue-100 focus:ring-0"
                required
              />
            </div>

            <div className="mt-4">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full mt-2 h-11 bg-gray-100 rounded-xl shadow-lg px-4 focus:bg-blue-100 focus:ring-0"
                  required
                />
            </div>

           
            </div>
              
            )}
            {!isRegister && (
                <div>
            <div>
                <input
                  type="text"
                  name="identifier"
                  placeholder="Email / Phone number "
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 h-11 bg-gray-100 rounded-xl shadow-lg px-4 focus:bg-blue-100 focus:ring-0"
                />
            </div>
            

            <div className="mt-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-2 h-11 bg-gray-100 rounded-xl shadow-lg px-4 focus:bg-blue-100 focus:ring-0"
                required
              />
            </div>
              <div className="mt-4 flex justify-between items-center">
                <label className="flex items-center text-sm text-gray-600">
                  <input type="checkbox" className="mr-2" /> Remember Me
                </label>
                <Link className="text-sm text-blue-500 hover:text-blue-700">
                  Forgot Password?
                </Link>
              </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-6">
              <button className="w-full py-3 bg-blue-500 text-white rounded-xl shadow-xl hover:shadow-inner transition duration-300"
              onClick={(e) => handleClick(e)}>
                {isRegister ? "Sign Up" : "Login"}
              </button>
            </div>

            {/* Switch Between Login & Register */}
            <div className="mt-6 text-center">
              {isRegister ? (
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500 hover:underline">
                    Login
                  </Link>
                </p>
              ) : (
                <p>
                  Dont have an account?{" "}
                  <Link to="/sign-up" className="text-blue-500 hover:underline">
                    Sign Up
                  </Link>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;