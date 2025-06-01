import React, { useState, useRef } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Product } from '../../types/Interface';
import Apis from '../../api/Apis';

const ProductManagement = () => {
    const { products, fetchProducts } = useAdmin();
    const { addProduct, updateProduct, deleteProductImages, deleteProduct } = Apis();

    const [currentProduct, setCurrentProduct] = useState<Product>({
        _id: '',
        name: '',
        description: '',
        price: 0,
        imageUrl: [],
    });
    const [images, setImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showForm, setShowForm] = useState(false);
    const [updateForm, setUpdateForm] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({});

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const buildFormData = (product: Product, images: File[]): FormData => {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price.toString());
        images.forEach((image) => formData.append('images', image));
        return formData;
    };

    const resetCurrentProduct = () => {
        setCurrentProduct({
            _id: '',
            name: '',
            description: '',
            price: 0,
            imageUrl: [],
        });
        setImages([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = buildFormData(currentProduct, images);
        await addProduct(formData);

        await fetchProducts();

        resetCurrentProduct();
        setShowForm(false);
    };

    const showEditProductForm = (product: Product) => {
        setCurrentProduct({
            _id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
        });
        setShowForm(true);
        setUpdateForm(true);
    }

    const handleUpdateProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = buildFormData(currentProduct, images);
        await updateProduct(currentProduct._id, formData);
        await fetchProducts();
        setUpdateForm(false);
        setShowForm(false);
        resetCurrentProduct();
    }

    const handleDeleteProductImages = async (id: string) => {
        await deleteProductImages(id);
        setCurrentProduct(prev => ({
            ...prev,
            imageUrl: []
        }));
    }

    const handleDeleteProduct = async (id: string) => {
        await deleteProduct(id);
        await fetchProducts();
    }

    const handleNextImage = (productId: string) => {
        setCurrentImageIndex(prev => ({
            ...prev,
            [productId]: ((prev[productId] || 0) + 1) % (products.find(p => p._id === productId)?.imageUrl.length || 1)
        }));
    };

    const handlePrevImage = (productId: string) => {
        setCurrentImageIndex(prev => {
            const product = products.find(p => p._id === productId);
            const imageCount = product?.imageUrl.length || 1;
            return {
                ...prev,
                [productId]: ((prev[productId] || 0) - 1 + imageCount) % imageCount
            };
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Product Management</h2>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setUpdateForm(false);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    {showForm ? 'Cancel' : 'Add New Product'}
                </button>
            </div>

            {showForm && (
                <div className="mb-8 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">Add New Product</h3>
                    <form onSubmit={updateForm ? handleUpdateProduct : handleAddProduct} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input
                                type="text"
                                value={currentProduct.name}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={currentProduct.description}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                value={currentProduct.price}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, price: Number(e.target.value) })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                                min="0"
                                step="0.5"
                            />
                        </div>

                        {updateForm && currentProduct.imageUrl.length > 0 &&
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Uploaded Images</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {currentProduct.imageUrl.map((imgUrl, index) => (
                                        <div
                                            key={index}
                                            className="relative flex items-center justify-center group"
                                        >
                                            <img
                                                src={`${BACKEND_URL}${imgUrl}`}
                                                alt={`${currentProduct.name} - ${index + 1}`}
                                                className="h-16 w-16 rounded-md object-cover border border-gray-200"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteProductImages(currentProduct._id)}
                                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                                >
                                    Delete All Images
                                </button>
                            </div>
                        }

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Images</label>
                            <div className="flex items-center gap-4">
                                <label className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200">
                                    <svg
                                        className="w-8 h-8 text-gray-500 mb-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="text-sm text-gray-600">
                                        {images.length > 0
                                            ? `${images.length} file${images.length !== 1 ? 's' : ''} selected`
                                            : 'Click to upload or drag and drop'}
                                    </span>
                                    <span className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</span>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        ref={fileInputRef}
                                        className="hidden"
                                    />
                                </label>

                                {images.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImages([]);
                                            if (fileInputRef.current) fileInputRef.current.value = '';
                                        }}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>

                            {images.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {Array.from(images).map((file, index) => (
                                        <div key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                            {file.name} ({Math.round(file.size / 1024)}KB)
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                            >
                                {updateForm ? 'update Product' : 'Add Product'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setUpdateForm(false);
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div >
            )}

            {products.length > 0 &&
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Product List</h3>
                        <span className="text-sm text-gray-500">{products.length} products</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((product) => {
                                    const currentIndex = currentImageIndex[product._id] || 0;
                                    const hasMultipleImages = product.imageUrl.length > 1;

                                    return (
                                        <tr key={product._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="relative flex items-center justify-center">
                                                    {product.imageUrl.length > 0 ? (
                                                        <div className="relative flex items-center justify-center group">
                                                            <img
                                                                src={`${BACKEND_URL}${product.imageUrl[currentIndex]}`}
                                                                alt={product.name}
                                                                className="h-16 w-16 rounded-md object-cover border border-gray-200"
                                                            />

                                                            {hasMultipleImages && (
                                                                <>
                                                                    {/* Left Arrow */}
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handlePrevImage(product._id);
                                                                        }}
                                                                        className="absolute left-0 z-10 p-1 bg-white/80 rounded-full text-gray-800 hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-md transform -translate-x-1/2"
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="h-5 w-5"
                                                                            viewBox="0 0 20 20"
                                                                            fill="currentColor"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </svg>
                                                                    </button>

                                                                    {/* Right Arrow */}
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleNextImage(product._id);
                                                                        }}
                                                                        className="absolute right-0 z-10 p-1 bg-white/80 rounded-full text-gray-800 hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-md transform translate-x-1/2"
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="h-5 w-5"
                                                                            viewBox="0 0 20 20"
                                                                            fill="currentColor"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </svg>
                                                                    </button>

                                                                    {/* Image Counter */}
                                                                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
                                                                        {currentIndex + 1}/{product.imageUrl.length}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center">
                                                            <svg
                                                                className="h-6 w-6 text-gray-400"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">{product.description}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {formatPrice(product.price)} €
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => showEditProductForm(product)}
                                                        className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 transition-colors">
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteProduct(product._id)}
                                                        className="text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50 transition-colors">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div >
    );
};

export default ProductManagement;