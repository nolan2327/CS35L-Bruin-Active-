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

/*
    > The Functions below are for the users database
*/
// Call this function when you need to register a user, make sure to JSON stringify
export const registerUser = async(name, email, password) => {
    try {
        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify({name: name, email: email, password: password}));

        return response;
    } catch(error) {
        console.log(error);
        return "error try function failed";
    }
}

// Call this function when you need to login a user, make sure to JSON stringify
export const loginUser = async(email, password) => {
    try {
        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify({email: email, password: password}));

        return response;
    } catch(error) {
        console.log(error);
        return "error try function failed";
    }
}

export const getUsers = async() => {
    try {
        const response = await getRequest(`${baseUrl}/users/`);

        return response;
    } catch(error) {
        console.log(error);
        return "error try function failed";
    }
}

/*
    > The Functions below are for accessing the calendar database
*/

export const findEventsByDate = async(start_date) => {
    try {
        const response = await postRequest(`${baseUrl}/calendar/findEventsByDate`, JSON.stringify({start_date: start_date}));

        return response;
    } catch(error) {
        console.log(error);
        return "error try function failed";
    }
}