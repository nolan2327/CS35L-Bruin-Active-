// Created by backend

export const baseUrl = "http://localhost:5000/api";

export const postRequest = async(url, body) => { // body should be JSON.stringified
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body,
    });

    const data = await response.json()

    if(!response.ok) {
        let message;

        if(data?.message) {
            message = data.message;
        } else {
            message = data;
        }

        return { error: true, message };
    }

    return data;
}

// Call this function when you need to register a user, make sure to JSON stringify
// For 
export const registerUser = async(body) => {
    const response = await postRequest(`${baseUrl}/users/register`, body);

    return response;
}

// Call this function when you need to login a user, make sure to JSON stringify
export const loginUser = async(body) => {
    const response = await postRequest(`${baseUrl}/users/login`, body);

    return response;
}

export const findDatesByDate = async(body) => {
    const response = await postRequest(`${baseUrl}/calendar/findDatesByDate`, body);

    return response;
}

// Work in progress, it works technically but you need to know how to use this function.
export const getRequest = async(url) => {
    const response = await fetch(url);

    const data = await response.json();

    if(!response.ok) {
        let message = "error";

        if(data?.message) {
            message = data.message;
        }

        return { error: true, message };
    }

    return data;
}