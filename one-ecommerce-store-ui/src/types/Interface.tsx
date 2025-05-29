export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}

export interface StoredCartItem {
  id: string; // Product ID
  quantity: number;
}

export interface Payment {
  _id: string;
  method: string; // e.g. "paypal", "credit card"
  status: string; // e.g. "paid", "pending", "refunded"
  transactionId: string;
  date: string; // ISO string
}

export interface PersonalDetail {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
}

export interface ShippingAddress {
  _id: string;
  streetAndHouseNumber: string;
  zip: string;
  city: string;
  comment: string;
  country: string;
}

export interface Order {
  _id: string;
  cartItems: CartItem[];
  personalDetail: PersonalDetail;
  shippingAddress: ShippingAddress;
  payment: Payment;
  price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string; // Optional: may be omitted in responses
}
