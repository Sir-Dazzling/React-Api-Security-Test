export const authService = 
{
    getCurrentUser
};

function getCurrentUser()
{
    return JSON.parse(localStorage.getItem("user"));    
}