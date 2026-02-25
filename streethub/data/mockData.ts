import { User, Supplier, TrendingCategory } from "@/type/feed";

export const mockUsers: User = [ 
    {
    id: "1",
    username: "johndoe",
    displayName: "John Doe",
    avatar: "",
    verified: true,
    followers: 1200,
    following: 500,
    bio: "Software developer passionate about creating innovative solutions.",
    reputation: 1500,
},
{
    id: '2',
    username: 'hypebeast_br',
    displayName: 'Hypebeast BR',
    avatar: 'https://images.unsplash.com/photo-1620204389674-ef76805d76b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150',
    verified: true,
    followers: 8900,
    following: 156,
    bio: 'Drops semanais • Premium only',
    reputation: 95,
  },
  {
    id: '3',
    username: 'urbanstyle',
    displayName: 'Urban Style',
    avatar: 'https://images.unsplash.com/photo-1609091289242-735df7a2207a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150',
    verified: false,
    followers: 2340,
    following: 890,
    bio: 'Começando na importação 🚀',
    reputation: 87,
  },
  {
    id: '4',
    username: 'drip_hunter',
    displayName: 'Drip Hunter',
    avatar: 'https://images.unsplash.com/photo-1699903905361-4d408679753f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150',
    verified: false,
    followers: 5600,
    following: 234,
    reputation: 92,
  },
  {
    id: '5',
    username: 'flex_imports',
    displayName: 'Flex Imports',
    avatar: 'https://images.unsplash.com/photo-1620204389674-ef76805d76b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150',
    verified: true,
    followers: 15200,
    following: 120,
    reputation: 99,
  },
]

export const mockSuppliers: Supplier[] = [
    { id: '1', name: 'Yupoo Fashion Store', rating: 4.8, totalOrders: 15420, verified: true,  responseTime: '< 2h', avatar: '🏪' },
    { id: '2', name: 'Taobao Premium',      rating: 4.9, totalOrders: 23100, verified: true,  responseTime: '< 1h', avatar: '🛍️' },
    { id: '3', name: 'Weidian Streetwear',  rating: 4.6, totalOrders: 8900,  verified: true,  responseTime: '< 3h', avatar: '👕' },
    { id: '4', name: '1688 Direct',         rating: 4.7, totalOrders: 12300, verified: false, responseTime: '< 5h', avatar: '📦' },
    { id: '5', name: 'Pandabuy Goods',      rating: 4.9, totalOrders: 34200, verified: true,  responseTime: '< 1h', avatar: '🐼' },
];

// ── Usuário logado (mock) ──────────────────────────────────────────────────
// Substituir pelo contexto de autenticação quando o backend estiver pronto.
export const currentUser: User = mockUsers[0];

// ── Tendências ─────────────────────────────────────────────────────────────
export const trendingCategories: TrendingCategory[] = [
  { name: 'Hoodies',  count: 1240, growth: '+12%' },
  { name: 'Tênis',    count: 2890, growth: '+25%' },
  { name: 'Cargos',   count: 890,  growth: '+8%'  },
  { name: 'Jaquetas', count: 1560, growth: '+18%' },
  { name: 'Bonés',    count: 670,  growth: '+5%'  },
];