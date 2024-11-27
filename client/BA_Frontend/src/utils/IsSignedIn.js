import React, { createContext, useState } from 'react';

// Import AuthContext to use the isLoggedIn bool, and Sign in swith (SiSwitch)
export const AuthContext = createContext();

// Wrap App.js in the AuthProvider
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const SiSwitch = () => {
        if (isLoggedIn === false) {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    }
    return (
        <AuthContext.Provider value={{ isLoggedIn, SiSwitch }}>
            {children}
        </AuthContext.Provider>
    );
};
