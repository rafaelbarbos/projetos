import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.db.models.post import Post
from app.db.models.post_save import PostSave
from app.db.models.post_vote import PostVote
from app.db.models.user import User
from app.deps import get_current_user_optional, get_db
from app.schemas.post import PostPublic, post_to_public

router = APIRouter(prefix="/api/feed", tags=["feed"])


def _votes_and_saves(db: Session, post_ids: list[uuid.UUID], user: User | None) -> tuple[dict, set]:
    if user is None or not post_ids:
        return {}, set()

    votes = {
        v.post_id: v.vote
        for v in db.scalars(
            select(PostVote).where(PostVote.user_id == user.id, PostVote.post_id.in_(post_ids))
        )
    }
    saves = {
        s.post_id
        for s in db.scalars(
            select(PostSave).where(PostSave.user_id == user.id, PostSave.post_id.in_(post_ids))
        )
    }
    return votes, saves


@router.get("/posts", response_model=list[PostPublic])
def list_posts(
    category: str | None = Query(default=None),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
) -> list[PostPublic]:
    query = select(Post).options(joinedload(Post.comments)).order_by(Post.created_at.desc())
    if category:
        query = query.where(Post.category == category)
    query = query.offset((page - 1) * page_size).limit(page_size)

    posts = list(db.scalars(query).unique())
    votes, saves = _votes_and_saves(db, [p.id for p in posts], current_user)

    return [post_to_public(post, votes.get(post.id), post.id in saves) for post in posts]


@router.get("/posts/{post_id}", response_model=PostPublic)
def get_post(
    post_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
) -> PostPublic:
    post = db.get(Post, post_id)
    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="post_not_found")

    votes, saves = _votes_and_saves(db, [post.id], current_user)
    return post_to_public(post, votes.get(post.id), post.id in saves)
