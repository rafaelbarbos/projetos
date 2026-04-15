export interface User {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    verified: boolean;
    followers: number;
    following: number;
    bio?: string;
    reputation: number;
}

export interface Supplier {
    id: string;
    name: string;
    ratting: number;
    totalOrders: number;
    verified: boolean;
    responseTime: string; // em horas
    avatar: string;
}

export interface ShippingAgent {
    id: string;
    name: string;
    avatar: string;
    averageDelivery: string;
}

export interface Comment {
    id: string;
    user: User;
    text: string;
    timestamp: string;
    likes: number;
}

export interface Post {
    id: string;
    user: User;
    image: string;
    title: string;
    priceYuan: number;
    priceReal: number;
    supplier: Supplier;
    taxed: boolean;
    likes: number;
    comments: Comment[];
    saved: boolean;
    liked: boolean;
    timestamp: string;
    category: string;
}

export interface TrendingCategory {
    name: string;
    count: number;
    growth: string;
}