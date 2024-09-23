import axios from 'axios';


export const login = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Login error', error);
        throw error;
    }
};

export const signup = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
        return response.data;
    } catch (error) {
        console.error('Signup error', error);
        throw error;
    }
};




