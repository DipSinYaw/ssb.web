// Base URL for the backend API
const BASE_URL = 'http://localhost:3000/users';

// Function to get all users
async function getAllUsers() {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        return null;
    }
}

// Function to get a user by ID
async function getUserById(userId) {
    try {
        const response = await axios.get(`${BASE_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        return null;
    }
}

// Function to remove a user
async function removeUser(userId) {
    try {
        const response = await axios.delete(`${BASE_URL}/remove`, { data: { id: userId } });
        return response.data;
    } catch (error) {
        console.error('Error removing user:', error);
        return null;
    }
}

// Function to update a user by ID
async function updateUser(userId, userData) {
    try {
        const response = await axios.post(`${BASE_URL}/updateById`, { id: userId, ...userData });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
}

// Function to register a new user
async function registerUser(userData) {
    const BASE_URL = 'http://localhost:3000/user';
    try {
        console.log("Sending request to register user:", userData);
        const response = await axios.post(`${BASE_URL}/registerUser`, userData);
        console.log("Response from server:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

// Function to login a user
async function loginUser(userData) {
    try {
        const response = await axios.post(`${BASE_URL}/login`, userData);
        if (response.data) {
            // Generate avatar URL on the backend
            const user = response.data.user;
            const avatarName = user.userName.replace(" ", "+");
            user.avatar = `https://ui-avatars.com/api/?name=${avatarName}&background=ffffff&color=ff0000`;
        }
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        return null;
    }
}

// Export the functions for use in other files
export { getAllUsers, getUserById, removeUser, updateUser, registerUser, loginUser };
