// auth.js
import axios from 'axios';

const API = "http://34.230.54.123:8080"
export const register = async (userData) => {
  try {
    await axios.post(`${API}/user/registration`, userData);
    return { isRegistered: true };
  } catch (error) {
    let errorMessage = "Error en el registro";
    if (error.response?.status === 400) {
      errorMessage = "El correo ya está registrado";
    }
    return { isRegistered: false, error: errorMessage };
  }
};




export const login = async (credentials) => {
  try {
    // Step 1: Request login and get the token
    const loginResponse = await axios.post(`${API}/login`, credentials);
    const { token } = loginResponse.data;

    // Save the token to localStorage or session storage
    localStorage.setItem('authToken', token);

    // Step 2: Fetch user details, including role, with the token
    const userResponse = await axios.get(`${API}/user/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const user = userResponse.data; // Save the full user object

    // Save user to localStorage or session storage
    localStorage.setItem('user', JSON.stringify(user));

    return { isLoggedIn: true, user };
  } catch (error) {
    console.error('Login failed:', error);
    return { isLoggedIn: false, error: 'Invalid credentials' };
  }
};
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
};

export const getAuthStatus = () => {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole');
  const user = JSON.parse(localStorage.getItem("user"));
  return { isLoggedIn: !!token, role, user };
};
