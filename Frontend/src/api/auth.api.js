import { axiosInstance } from "../lib/axiosCall";
import Cookies from "js-cookie";

async function signUpUser(formData) {
    try {
        const response = await axiosInstance.post('/api/auth/register', formData);
        return response.data;
    } catch (error) {
        console.log('Error while SignIn', error.response ? error.response.data : error.message);
        throw error;
    }
}
async function Logout() {
    try {
        const response = await axiosInstance.post('/api/auth/logout', {}, { withCredentials: true });
        Cookies.remove("__accessToken", { path: "/" });
        Cookies.remove("__refreshToken", { path: "/" });
        return response.data;
    } catch (error) {
        console.log('Error while Logging Out:', error.response ? error.response.data : error.message);
        throw error;
    }
}


async function signInUser(formData) {
    try {
        const response = await axiosInstance.post('/api/auth/login', formData);
        return response.data;
    } catch (error) {
        console.error('Error while logging in:', error.response ? error.response.data : error.message);
        throw error;
    }
}








export { signUpUser , signInUser  , Logout };