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
    > The Functions below are for registering, loging in, and getting all users
*/
export const registerUser = async(username, password) => {
    try {
        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify({username: username, password: password}));

        return response;
    } catch(error) {
        console.log(error);
        return "error registerUser try function failed";
    }
}

export const loginUser = async(username, password) => {
    try {
        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify({username: username, password: password}));

        return response;
    } catch(error) {
        console.log(error);
        return "error loginUser try function failed";
    }
}

export const getUsers = async() => {
    try {
        const response = await getRequest(`${baseUrl}/users/`);

        return response;
    } catch(error) {
        console.log(error);
        return "error getUsers try function failed";
    }
}

/*
    > The Functions below are for accessing and inserting information for profiles
*/
export const createProfile = async(username, status, bio) => {
    try {
        const response = await postRequest(`${baseUrl}/profiles/createProfile`, JSON.stringify({username: username, status: status, bio: bio}));

        return response;
    } catch(error) {
        console.log(error);
        return "error createProfile try function failed";
    }
}

export const findProfile = async(username) => {
    try {
        const response = await postRequest(`${baseUrl}/profiles/findProfile`, JSON.stringify({username: username}));

        return response;
    } catch(error) {
        console.log(error);
        return "error findProfile try function failed";
    }
}

export const changeStatus = async(username, newStatus) => {
    try {
        const response = await postRequest(`${baseUrl}/profiles/changeStatus`, JSON.stringify({username: username, newStatus: newStatus}));

        return response;
    } catch(error) {
        console.log(error);
        return "error changeStatus try function failed";
    }
}

export const changeBio = async(username, newBio) => {
    try {
        const response = await postRequest(`${baseUrl}/profiles/changeBio`, JSON.stringify({username: username, newBio: newBio}));

        return response;
    } catch(error) {
        console.log(error);
        return "error changeBio try function failed";
    }
}

export const getProfiles = async() => {
    try {
        const response = await getRequest(`${baseUrl}/profiles/`);

        return response;
    } catch(error) {
        console.log(error);
        return "error getProfiles try function failed";
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
        return "error findEventsByDate try function failed";
    }
}