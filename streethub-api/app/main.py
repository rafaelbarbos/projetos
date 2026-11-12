from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import auth, calculator, comments, feed, posts, suppliers, users

app = FastAPI(title="StreetHub API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(feed.router)
app.include_router(posts.router)
app.include_router(users.router)
app.include_router(suppliers.router)
app.include_router(calculator.router)
app.include_router(comments.router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
