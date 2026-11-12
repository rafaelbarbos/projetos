# StreetHub API

Backend em FastAPI para o StreetHub (substitui a tentativa anterior em Java/Spring).

## Stack
- Python 3.14
- FastAPI + Uvicorn
- SQLAlchemy 2 + Alembic
- PostgreSQL
- JWT (python-jose) + passlib (bcrypt)

## Como rodar

1. Subir o Postgres:
   ```bash
   docker compose up -d
   ```
2. Criar e ativar o virtualenv, instalar dependências:
   ```bash
   python -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Copiar `.env.example` para `.env` e ajustar se necessário.
4. Rodar as migrations:
   ```bash
   alembic upgrade head
   ```
5. Popular dados de exemplo (equivalentes ao mockData.ts do frontend):
   ```bash
   python -m app.db.seed
   ```
6. Rodar a API:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
7. Documentação interativa em `http://localhost:8000/docs`.

## Estrutura
- `app/core` — config (env vars) e segurança (hash de senha, JWT).
- `app/db/models` — modelos SQLAlchemy.
- `app/db/seed.py` — popula o banco com dados equivalentes ao mock do frontend.
- `app/schemas` — schemas Pydantic (request/response), espelham `types/feed.ts` do frontend.
- `app/routers` — endpoints por área: auth, feed, posts, users, suppliers.
- `alembic/` — migrations do schema.

## Escopo atual (P0 do roadmap)
- Autenticação (registro, login, me).
- Feed de posts com voto (green/red light), salvar e comentar.
- Perfil público e seguir/deixar de seguir.
- Listagem básica de fornecedores.

Fora do escopo por ora: busca/filtros avançados, notificações, moderação,
taxa de câmbio real na calculadora (ver `docs/mvp-funcionalidades.md` no
frontend para o roadmap completo).
