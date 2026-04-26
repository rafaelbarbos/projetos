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
    rating: number;
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
    verified?: boolean;
    rating?: number;
    totalOrders?: number;
}

export type PostVote = 'green' | 'red' | null;

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
    image?: string;
    images?: string[];
    title: string;
    description?: string;
    priceYuan: number;
    priceReal: number;
    supplier?: Supplier;
    shippingAgent?: ShippingAgent;
    productLink?: string;
    weight?: number;
    warehouseTime?: string;
    taxed?: boolean;
    likes?: number;
    greenLights?: number;
    redLights?: number;
    userVote?: PostVote;
    comments: Comment[];
    saved: boolean;
    liked?: boolean;
    timestamp: string;
    category: string;
}

export interface TrendingCategory {
    name: string;
    count: number;
    growth: string;
}