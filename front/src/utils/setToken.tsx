import axios from 'axios';

const setToken = async (credential: string, password: string) => {
  try {
    const response = await axios.post('https://linkastic.onrender.com/login', { credential, password });
    const { token } = response.data;

    localStorage.setItem('token', token);
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error; 
  }
};

export default setToken;
