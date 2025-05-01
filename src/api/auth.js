import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your actual backend URL

export const signUpUser = async ({ name, email, password, userRole }) => {
  const response = await axios.post(`${API_BASE_URL}/auth/sign-up`, {
    name,
    email,
    password,
    userRole
  });
  return response.data;
};

export const signInUser = async ({ email, password }) => {
  const response = await axios.post(`${API_BASE_URL}/auth/sign-in`, {
    email,
    password
  });
  return response.data;
};
