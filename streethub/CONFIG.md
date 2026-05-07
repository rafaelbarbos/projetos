# 📋 Configuração - StreetHub

Documentação completa sobre configurações, variáveis de ambiente e setup do projeto.

---

## 🚀 Setup Inicial

### 1. Clonar e Instalar
```bash
git clone <repo-url>
cd streethub
npm install
```

### 2. Variáveis de Ambiente
Criar arquivo `.env.local` na raiz:

```env
# API & Backend
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_TIMEOUT=5000

# Autenticação
NEXT_PUBLIC_AUTH_ENABLED=true
AUTH_SECRET=seu-secret-aqui

# Modo Mock (desenvolvimento)
NEXT_PUBLIC_USE_MOCK_DATA=true

# Analytics (opcional)
NEXT_PUBLIC_ANALYTICS_ID=
NEXT_PUBLIC_ANALYTICS_ENABLED=false

# Environment
NODE_ENV=development
```

### 3. Executar
```bash
npm run dev
# Acessa: http://localhost:3000
```

---

## ⚙️ Variáveis de Ambiente

| Variável | Tipo | Padrão | Descrição |
|----------|------|--------|-----------|
| `NEXT_PUBLIC_API_URL` | string | `http://localhost:3001` | URL base da API |
| `NEXT_PUBLIC_API_TIMEOUT` | number | `5000` | Timeout em ms para requisições |
| `NEXT_PUBLIC_USE_MOCK_DATA` | boolean | `true` | Usar mocks em desenvolvimento |
| `NEXT_PUBLIC_AUTH_ENABLED` | boolean | `true` | Habilitar autenticação |
| `AUTH_SECRET` | string | - | Secret para JWT/sessões |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | boolean | `false` | Habilitar analytics |
| `NODE_ENV` | enum | `development` | `development` \| `production` \| `test` |

---

## 📁 Estrutura de Configuração

### Next.js Config
**Arquivo:** `next.config.ts`

```typescript
// Configurações de build, otimização, etc
```

### TypeScript Config
**Arquivo:** `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Tailwind Config
**Arquivo:** `tailwind.config.ts`

```typescript
// Temas, cores, plugins customizados
```

### ESLint Config
**Arquivo:** `eslint.config.mjs`

```javascript
// Regras de lint e padrões de código
```

---

## 🔌 API & Backend

### Endpoints Esperados

#### Feed
```
GET /api/feed/posts          - Listar posts do feed
GET /api/feed/posts/:id      - Detalhe de um post
POST /api/feed/posts         - Criar novo post
```

#### Posts
```
GET /api/posts/:id                    - Detalhe do post
POST /api/posts/:id/vote              - Votar no post (GL/RL)
POST /api/posts/:id/save              - Salvar post
POST /api/posts/:id/comments          - Adicionar comentário
```

#### Autenticação
```
POST /api/auth/login                  - Login
POST /api/auth/register               - Registro
POST /api/auth/logout                 - Logout
GET /api/auth/me                      - Usuário atual
```

### Mock Data

**Arquivo:** `data/mockData.ts`

Contém:
- `mockUsers[]` - Usuários simulados
- `mockSuppliers[]` - Fornecedores
- `mockShippingAgents[]` - Agentes de envio
- `mockPosts[]` - Posts com imagens, votos, comentários
- `trendingCategories[]` - Tendências
- `currentUser` - Usuário logado (mock)

**Quando usar mocks:**
- Desenvolvimento local
- Testes
- Prototipagem rápida

**Quando desabilitar mocks:**
- Produção
- Integração com backend real

---

## 🎨 Tema & Estilo

### Tailwind Colors
```
neutral-950  - Fundo principal (preto)
neutral-900  - Fundo secundário (cards)
neutral-800  - Bordas/separadores
purple-600   - Cor primária (CTA)
green-400    - Positivo (preço, GL)
yellow-400   - Destaque (Yuan)
red-400      - Negativo (RL)
```

### Breakpoints
```
sm: 640px    - Mobile
md: 768px    - Tablet
lg: 1024px   - Desktop
xl: 1280px   - Desktop grande
```

---

## 📦 Dependências Principais

```json
{
  "dependencies": {
    "next": "^15.x",
    "react": "^19.x",
    "lucide-react": "^latest",
    "tailwindcss": "^3.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "eslint": "^latest",
    "@types/node": "^latest"
  }
}
```

---

## 🧪 Testes

### Estrutura
```
__tests__/
├── unit/              - Testes unitários
├── integration/       - Testes de integração
└── e2e/              - Testes end-to-end
```

### Executar Testes
```bash
npm run test           # Todos os testes
npm run test:watch    # Modo watch
npm run test:coverage # Coverage
```

---

## 🚢 Build & Deploy

### Build Local
```bash
npm run build
npm run start
```

### Variáveis de Produção
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.streethub.com
NEXT_PUBLIC_USE_MOCK_DATA=false
NEXT_PUBLIC_AUTH_ENABLED=true
```

### Deploy Opções
1. **Vercel** (recomendado para Next.js)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Docker**
   ```bash
   docker build -t streethub .
   docker run -p 3000:3000 streethub
   ```

3. **Self-hosted**
   - Node.js 18+
   - PM2 ou similar para gerenciamento

---

## 🔐 Segurança

### Secrets Sensíveis
Nunca commitar:
- `.env.local`
- `.env.*.local`
- Chaves privadas
- Tokens de API

### Variáveis Seguras
- Usar `NEXT_PUBLIC_` somente para dados públicos
- Variáveis privadas sem prefixo são server-only

### CORS
```typescript
// Configurar CORS no backend para:
// - localhost:3000 (dev)
// - streethub.com (produção)
```

---

## 📝 Mocks & Dados

### Alterar Mock Data
**Arquivo:** `data/mockData.ts`

```typescript
// Adicionar novo post mock
mockPosts.push({
  id: "9",
  user: mockUsers[0],
  images: ["url1", "url2", "url3"],
  title: "Novo Produto",
  // ... outros campos
});
```

### Usar Dados Reais
Remover import de `mockData` e substituir por fetch:

```typescript
// Antes
import { mockPosts } from '@/data/mockData';

// Depois
async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/feed/posts`);
  return res.json();
}
```

---

## 🔄 Fluxo de Dados

### Feed → Detalhe
```
FeedList
  ↓
PostCard (componente)
  ├─ usePostCardState (hook)
  │  ├─ usePostMedia
  │  ├─ usePostEngagement
  │  └─ usePostShippingAgent
  ├─ PostCardHeader
  ├─ PostCardImage (carrossel com navegação)
  ├─ PostCardPricing
  ├─ VoteSection
  ├─ PostActions
  └─ CommentsPreview
        ↓
    Link → /post/[id]
        ↓
    PostDetailPage
      ├─ PostImage (com carrossel)
      ├─ PostInfo
      ├─ PostPricing
      ├─ PostActions
      └─ PostComments
```

---

## 📊 Hooks Compartilhados

**Localização:** `components/post/hooks/`

### usePostEngagement
- Estados: `saved`, `userVote`, `greenLights`, `redLights`
- Handlers: `handleVote()`, `handleSave()`

### usePostMedia
- Estados: `images`, `currentImageIndex`
- Lógica: Validação e slicing de imagens (máx. 5)

### usePostShippingAgent
- Normaliza dados de fornecedor/agente
- Fallback automático entre `shippingAgent` e `supplier`

---

## 🛠️ Scripts NPM

```bash
npm run dev              # Desenvolvimento
npm run build            # Build para produção
npm run start            # Executar build
npm run lint             # Lint de código
npm run type-check       # Verificar tipos TypeScript
npm run test             # Rodar testes
```

---

## 📞 Troubleshooting

### Imagens não carregam
- Verificar URL em `mockData.ts`
- Verificar CORS se usando API real
- Testar em browser: F12 → Network

### Estado de carrossel não atualiza
- Verificar se `currentImageIndex` está sendo atualizado
- Validar que o `key` do componente muda com o índice
- Verificar se não há conflito com Links/navegação

### Votos não persistem
- Verificar se `usePostEngagement` está sendo usado
- Implementar persistência em localStorage ou API
- Validar que handlers estão conectados corretamente

---

## 📚 Referências

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Lucide Icons](https://lucide.dev)

---

**Última atualização:** May 7, 2026  
**Versão:** v0.1.0-baseline
