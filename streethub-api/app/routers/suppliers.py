from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.models.supplier import Supplier
from app.deps import get_db
from app.schemas.post import SupplierPublic

router = APIRouter(prefix="/api/suppliers", tags=["suppliers"])


@router.get("", response_model=list[SupplierPublic])
def list_suppliers(db: Session = Depends(get_db)) -> list[SupplierPublic]:
    suppliers = db.query(Supplier).order_by(Supplier.rating.desc()).all()
    return [
        SupplierPublic(
            id=s.id,
            name=s.name,
            avatar=s.avatar,
            rating=float(s.rating) if s.rating is not None else None,
            totalOrders=s.total_orders,
            verified=s.verified,
            responseTime=s.response_time,
        )
        for s in suppliers
    ]
