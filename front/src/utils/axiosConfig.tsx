import axios from 'axios';

const login = async (username: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:3001/login', { username, password });
        const { token } = response.data;
        
        localStorage.setItem('token', token);

    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
};

export default login;
