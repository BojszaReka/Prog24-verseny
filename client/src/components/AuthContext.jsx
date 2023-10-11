import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from 'universal-cookie'
const cookies = new Cookies();

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const API_URL = import.meta.env.VITE_APP_API_URL;
    const [user, setUser] = useState(() => {
        let user = localStorage.getItem("user");
        if (user) {
            return JSON.parse(user);
        }
        return null;
    });
    const navigate = useNavigate();
    const login = async (payload) => {
        let apiResponse = await axios.post(`${API_URL}/auth/login`, payload);
        cookies.set("token", apiResponse.data.token);
        localStorage.setItem("user", JSON.stringify(apiResponse.data));
        setUser(apiResponse.data);
        navigate("/loggedin");
    };

    const logout = async () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <>
            <AuthContext.Provider value={{ user, login, logout }}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export default AuthContext;