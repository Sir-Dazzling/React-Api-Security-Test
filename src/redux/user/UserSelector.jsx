import { authHeader } from '../../helpers/AuthHeader';

const API_URL = "http://localhost:8080/api/";

export const userService = 
{
    login,
    logout,
    getAll,
    getContentManagerHub,
    handleResponse
};

function login(username, password) 
{
    const requestOptions = 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch( API_URL + "auth/signin", requestOptions)
        .then(handleResponse)
        .then( user => {
            // login successful if there's a jwt token in the response
            if (user.accessToken) 
            {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            }
            
    });
}

function logout() 
{
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll()
{
    const requestOptions = 
    {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(API_URL + "test/all", requestOptions).then((response) => handleResponse(response));
}

function getContentManagerHub()
{
    const requestOptions = 
    {
        method: "GET",
        headers: authHeader()
    };

    return fetch(API_URL + "test/content_manager", requestOptions);
}

function handleResponse(response) 
{
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) 
        {
            if (response.status === 401) 
            {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
       
        return data;
    });
}