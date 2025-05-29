import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { axiosPublic } from './AxiosInstance';

const Apis = () => {
    const { login } = useAuth();

    const userLogin = async (email: string, password: string) => {
        try {
            const response = await axiosPublic.post('/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                login();
                toast.success('Login successful');
            }
        } catch (error) {
            console.error('***** login error: ', error);
            toast.error('Login failed');
        }
    };

    return {
        userLogin,
    };
};

export default Apis;
