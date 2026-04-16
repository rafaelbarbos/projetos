import { User, Supplier, Post, TrendingCategory, ShippingAgent } from "@/types/feed";

export const mockUsers: User[] = [ 
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
    { id: '1', name: 'Yupoo Fashion Store', ratting: 4.8, totalOrders: 15420, verified: true,  responseTime: '< 2h', avatar: '🏪' },
    { id: '2', name: 'Taobao Premium',      ratting: 4.9, totalOrders: 23100, verified: true,  responseTime: '< 1h', avatar: '🛍️' },
    { id: '3', name: 'Weidian Streetwear',  ratting: 4.6, totalOrders: 8900,  verified: true,  responseTime: '< 3h', avatar: '👕' },
    { id: '4', name: '1688 Direct',         ratting: 4.7, totalOrders: 12300, verified: false, responseTime: '< 5h', avatar: '📦' },
    { id: '5', name: 'Pandabuy Goods',      ratting: 4.9, totalOrders: 34200, verified: true,  responseTime: '< 1h', avatar: '🐼' },
];

export const mockShippingAgents: ShippingAgent[] = [
  { id: '1', name: 'Pandabuy', avatar: '🐼', averageDelivery: '7-15 dias', verified: true, rating: 4.9, totalOrders: 34200 },
  { id: '2', name: 'CSSBuy', avatar: '📦', averageDelivery: '10-20 dias', verified: true, rating: 4.7, totalOrders: 22800 },
  { id: '3', name: 'Superbuy', avatar: '✈️', averageDelivery: '8-18 dias', verified: true, rating: 4.8, totalOrders: 19100 },
  { id: '4', name: 'Sugargoo', avatar: '🍬', averageDelivery: '9-19 dias', verified: false, rating: 4.6, totalOrders: 15400 },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    user: mockUsers[0],
    image: "https://images.unsplash.com/photo-1721111260570-456f3306f8d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1721111260570-456f3306f8d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"
    ],
    title: "Essentials Hoodie Oversized - Bege Premium",
    priceYuan: 158,
    priceReal: 112.50,
    supplier: mockSuppliers[0],
    taxed: false,
    likes: 342,
    saved: false,
    liked: false,
    timestamp: "2h atrás",
    category: "Moletom",
    comments: [
      {
        id: "1",
        user: mockUsers[1],
        text: "Essa peça é insana! Já comprei e a qualidade é top 🔥",
        timestamp: "1h atrás",
        likes: 12
      },
      {
        id: "2",
        user: mockUsers[2],
        text: "Qual o peso aproximado pra calcular o frete?",
        timestamp: "45min atrás",
        likes: 3
      }
    ]
  },
  {
    id: "2",
    user: mockUsers[1],
    image: "https://images.unsplash.com/photo-1761942028138-2b494760aa3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1761942028138-2b494760aa3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"
    ],
    title: "Dunk Low Panda - Replica 1:1",
    priceYuan: 280,
    priceReal: 199.00,
    supplier: mockSuppliers[1],
    taxed: true,
    likes: 856,
    saved: true,
    liked: true,
    timestamp: "5h atrás",
    category: "Tênis",
    comments: [
      {
        id: "3",
        user: mockUsers[3],
        text: "Melhor batch do mercado! Recomendo demais",
        timestamp: "3h atrás",
        likes: 45
      }
    ]
  },
  {
    id: "3",
    user: mockUsers[4],
    image: "https://images.unsplash.com/photo-1764698192198-4cfb7188c6d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Corta-Vento Tech Reflective - Preto",
    priceYuan: 198,
    priceReal: 140.85,
    supplier: mockSuppliers[2],
    taxed: false,
    likes: 234,
    saved: false,
    liked: false,
    timestamp: "1d atrás",
    category: "Jaqueta",
    comments: []
  },
  {
    id: "4",
    user: mockUsers[2],
    image: "https://images.unsplash.com/photo-1499713907394-43c9d094ac2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Camiseta Vintage Graphic - Coleção Street",
    priceYuan: 68,
    priceReal: 48.40,
    supplier: mockSuppliers[0],
    taxed: false,
    likes: 189,
    saved: false,
    liked: true,
    timestamp: "2d atrás",
    category: "Camiseta",
    comments: [
      {
        id: "4",
        user: mockUsers[0],
        text: "Print de qualidade? Não desbota na lavagem?",
        timestamp: "1d atrás",
        likes: 8
      },
      {
        id: "5",
        user: mockUsers[2],
        text: "Lavei 3x e continua perfeita!",
        timestamp: "20h atrás",
        likes: 15
      }
    ]
  },
  {
    id: "5",
    user: mockUsers[3],
    image: "https://images.unsplash.com/photo-1649850874075-49e014357b9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1649850874075-49e014357b9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"
    ],
    title: "Cargo Pants Tactical - Verde Militar",
    priceYuan: 145,
    priceReal: 103.15,
    supplier: mockSuppliers[3],
    taxed: false,
    likes: 421,
    saved: true,
    liked: false,
    timestamp: "3d atrás",
    category: "Calça",
    comments: []
  },
  {
    id: "6",
    user: mockUsers[0],
    image: "https://images.unsplash.com/photo-1763192756578-7943a4103967?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Beanie Bordado Premium - Collection",
    priceYuan: 42,
    priceReal: 29.89,
    supplier: mockSuppliers[1],
    taxed: false,
    likes: 156,
    saved: false,
    liked: false,
    timestamp: "4d atrás",
    category: "Acessórios",
    comments: []
  },
  {
    id: "7",
    user: mockUsers[4],
    image: "https://images.unsplash.com/photo-1610659592009-088d5c2c4776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Mochila Urban Tech - 30L",
    priceYuan: 220,
    priceReal: 156.50,
    supplier: mockSuppliers[4],
    taxed: true,
    likes: 678,
    saved: true,
    liked: true,
    timestamp: "5d atrás",
    category: "Acessórios",
    comments: [
      {
        id: "6",
        user: mockUsers[1],
        text: "Cabe notebook 15 polegadas?",
        timestamp: "4d atrás",
        likes: 5
      }
    ]
  },
  {
    id: "8",
    user: mockUsers[1],
    image: "https://images.unsplash.com/photo-1760126070359-5b82710274fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1760126070359-5b82710274fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200"
    ],
    title: "Bomber Jacket Reversível - Preto/Laranja",
    priceYuan: 312,
    priceReal: 222.00,
    supplier: mockSuppliers[0],
    taxed: true,
    likes: 945,
    saved: false,
    liked: true,
    timestamp: "1sem atrás",
    category: "Jaqueta",
    comments: []
  }
];

const fallbackDescriptions = [
  'Tecido premium e ótimo caimento. Vale muito pelo custo-benefício.',
  'Batch muito consistente. Acabamento e conforto acima da média.',
  'Peça técnica com material leve e resistente para uso diário.',
  'Modelagem boa e estampa bem definida, sem aspecto lavado.',
  'Ótima opção para composição streetwear casual.',
  'Acessório com acabamento limpo e bom material.',
  'Boa capacidade interna e construção reforçada.',
  'Jaqueta com ótimo visual e bom nível de detalhe.',
];

mockPosts.forEach((post, index) => {
  post.images = post.images && post.images.length > 0
    ? post.images.slice(0, 5)
    : post.image
    ? [post.image]
    : [];

  post.description = post.description ?? fallbackDescriptions[index % fallbackDescriptions.length];
  post.productLink = post.productLink ?? `https://www.pandabuy.com/product/${post.id}`;
  post.shippingAgent = post.shippingAgent ?? mockShippingAgents[index % mockShippingAgents.length];
  post.weight = post.weight ?? Number((0.4 + (index % 5) * 0.2).toFixed(1));
  post.warehouseTime = post.warehouseTime ?? `${2 + (index % 4)} dias`;
  post.greenLights = post.greenLights ?? (post.likes ?? 0);
  post.redLights = post.redLights ?? Math.max(8, Math.round((post.greenLights ?? 0) * 0.18));
  post.userVote = post.userVote ?? null;
});

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