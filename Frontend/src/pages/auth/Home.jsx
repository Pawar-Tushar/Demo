// frontend/pages/Home.jsx
import React, { useContext } from 'react';
import { DataContext } from '../../context/DataProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {Logout} from '../../api/auth.api'

const Home = () => {

    const { User ,setUser, setIsUserAuthenticated } = useContext(DataContext);
    console.log("dsdsd")
    console.log( User)
    const navigate = useNavigate();


     const handleLogout = async () => {
        
        await Logout();
        setUser(null); // clear context
        setIsUserAuthenticated(false);
        toast.success("Logged out successfully");
    
    };


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Home Page</h1>
            {User ? (
                <div>
                    <p>Welcome, {User.name || User.email}!</p>
                 

                    <button
                       onClick={handleLogout}
                       className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <p>Loading User data or not logged in.</p>
            )}
        </div>
    );
};

export default Home;