export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
  isRecommended?: boolean;
  imageUrls?: string[];
  createdAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  shippingAddress?: {
    name: string;
    zip: string;
    address: string;
    phone: string;
  };
  createdAt: string;
  deliveryStatus?: 'Order Received' | 'Preparing Shipment' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedDeliveryDate?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  validUntil: string;
}
