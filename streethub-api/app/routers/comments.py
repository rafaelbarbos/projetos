import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.db.models.comment import Comment
from app.db.models.report import Report
from app.db.models.user import User
from app.deps import get_current_user, get_db
from app.schemas.report import ReportCreateRequest

router = APIRouter(prefix="/api/comments", tags=["comments"])


@router.post("/{comment_id}/report", status_code=status.HTTP_201_CREATED)
def report_comment(
    comment_id: uuid.UUID,
    payload: ReportCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> dict[str, str]:
    if db.get(Comment, comment_id) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="comment_not_found")

    db.add(Report(reporter_id=current_user.id, comment_id=comment_id, reason=payload.reason))
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="already_reported")
    return {"status": "reported"}
