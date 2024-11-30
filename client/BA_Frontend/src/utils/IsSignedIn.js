import React, { createContext, useState } from 'react';

// Import AuthContext to use the isLoggedIn bool, and Sign in swith (SiSwitch)
export const AuthContext = createContext();

// Wrap App.js in the AuthProvider
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mainUser, setmainUser] = useState("");

    const SiSwitch = () => {
        if (isLoggedIn === false) {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    }
    const SetGlobalUser = (u) => {
        setmainUser(u);
    }
    return (
        <AuthContext.Provider value={{ isLoggedIn, mainUser, SiSwitch, SetGlobalUser }}>
            {children}
        </AuthContext.Provider>
    );
};
