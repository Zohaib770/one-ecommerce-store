import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { axiosPublic } from './AxiosInstance';

const Apis = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const userLogin = async (email: string, password: string) => {
        try {
            const response = await axiosPublic.post('/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                login();
                console.log("===== Login successful");
                toast.success('Login successful');
                navigate('/admin/');
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
