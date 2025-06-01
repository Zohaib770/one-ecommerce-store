import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { axiosPublic, axiosPrivate } from './AxiosInstance';
import { Product } from '../types/Interface'

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

    const addProduct = async (formData: FormData) => {
        try {
            await axiosPrivate.post('/add-product', formData);
            toast.success('product added successful');
        } catch (error) {
            console.error('***** add product error: ', error);
            toast.error('add product failed');
        }
    }

    const updateProduct = async (id: string, formData: FormData) => {
        try {
            const response = await axiosPrivate.put(`/update-product/${id}`, formData);
            toast.success('Product updated successfully');
            return response.data;
        } catch (error) {
            console.error('***** update product error: ', error);
            toast.error('Update product failed');
            throw error;
        }
    }

    const deleteProduct = async (id: string) => {
        try {
            await axiosPrivate.delete(`/delete-product/${id}`);
            toast.success('Product deleted successfully');
        } catch (error) {
            console.error('***** delete product error: ', error);
            toast.error('Delete product failed');
        }
    }

    const deleteProductImages = async (id: string) => {
        try {
            await axiosPrivate.put(`/delete-product-images/${id}`);
            toast.success('Product images deleted successfully');
        } catch (error) {
            console.error('***** delete product images error: ', error);
            toast.error('Delete product images failed');
        }
    }

    const fetchAllProducts = async () => {
        try {
            const response = await axiosPublic.get('/fetch-all-products');
            return response;
        } catch (error) {
            console.error('***** fetch-all-product error: ', error);
        }
    }

    return {
        userLogin,
        addProduct,
        updateProduct,
        deleteProduct,
        deleteProductImages,
        fetchAllProducts,
    };
};

export default Apis;
