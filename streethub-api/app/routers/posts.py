import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.db.models.comment import Comment
from app.db.models.post import Post
from app.db.models.post_save import PostSave
from app.db.models.post_vote import PostVote
from app.db.models.report import Report
from app.db.models.user import User
from app.deps import get_current_user, get_db
from app.schemas.post import CommentCreateRequest, CommentPublic, PostPublic, VoteRequest, comment_to_public, post_to_public
from app.schemas.report import ReportCreateRequest

router = APIRouter(prefix="/api/posts", tags=["posts"])


def _get_post_or_404(db: Session, post_id: uuid.UUID) -> Post:
    post = db.get(Post, post_id)
    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="post_not_found")
    return post


@router.post("/{post_id}/vote", response_model=PostPublic)
def vote_post(
    post_id: uuid.UUID,
    payload: VoteRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PostPublic:
    post = _get_post_or_404(db, post_id)
    existing = db.query(PostVote).filter(PostVote.post_id == post_id, PostVote.user_id == current_user.id).first()

    if existing is not None:
        if existing.vote == "green":
            post.green_lights -= 1
        else:
            post.red_lights -= 1
        db.delete(existing)

    if payload.vote is not None and (existing is None or existing.vote != payload.vote):
        db.add(PostVote(post_id=post_id, user_id=current_user.id, vote=payload.vote))
        if payload.vote == "green":
            post.green_lights += 1
        else:
            post.red_lights += 1

    db.commit()
    db.refresh(post)

    saved = db.query(PostSave).filter(PostSave.post_id == post_id, PostSave.user_id == current_user.id).first()
    return post_to_public(post, payload.vote, saved is not None)


@router.post("/{post_id}/save", response_model=PostPublic)
def save_post(
    post_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PostPublic:
    post = _get_post_or_404(db, post_id)
    existing = db.query(PostSave).filter(PostSave.post_id == post_id, PostSave.user_id == current_user.id).first()

    if existing is not None:
        db.delete(existing)
        saved = False
    else:
        db.add(PostSave(post_id=post_id, user_id=current_user.id))
        saved = True

    db.commit()
    db.refresh(post)

    vote = db.query(PostVote).filter(PostVote.post_id == post_id, PostVote.user_id == current_user.id).first()
    return post_to_public(post, vote.vote if vote else None, saved)


@router.post("/{post_id}/comments", response_model=CommentPublic, status_code=status.HTTP_201_CREATED)
def create_comment(
    post_id: uuid.UUID,
    payload: CommentCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CommentPublic:
    post = _get_post_or_404(db, post_id)
    if not payload.text.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="empty_comment")

    comment = Comment(post_id=post.id, author_id=current_user.id, content=payload.text.strip())
    db.add(comment)
    post.comments_count += 1
    db.commit()
    db.refresh(comment)
    return comment_to_public(comment)


@router.post("/{post_id}/report", status_code=status.HTTP_201_CREATED)
def report_post(
    post_id: uuid.UUID,
    payload: ReportCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> dict[str, str]:
    _get_post_or_404(db, post_id)
    db.add(Report(reporter_id=current_user.id, post_id=post_id, reason=payload.reason))
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="already_reported")
    return {"status": "reported"}
