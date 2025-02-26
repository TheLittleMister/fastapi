from fastapi import APIRouter, HTTPException
from sqlmodel import select
from dependencies import SessionDep
from history.models import History, HistoryModel, HistoryChange
from users.models import User
from products.models import Product

router = APIRouter()


@router.post("/history/", tags=["history"])
async def add_history_item(history_item: HistoryModel, session: SessionDep):
    existing_user = session.exec(
        select(User).where(User.id == history_item.user_id)
    ).first()
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    existing_product = session.exec(
        select(Product).where(Product.id == history_item.product_id)
    ).first()
    if not existing_product:
        raise HTTPException(status_code=404, detail="Product not found")

    new_history_item = History(**history_item.dict())
    session.add(new_history_item)
    session.commit()
    session.refresh(new_history_item)
    return {
        "message": "History item added successfully",
        "history_item": new_history_item,
    }


@router.put("/history/", tags=["history"])
async def update_history_item(history_item: HistoryChange, session: SessionDep):
    existing_history_item = session.get(History, history_item.id)
    if not existing_history_item:
        raise HTTPException(status_code=404, detail="History item not found")

    for key, value in history_item.dict().items():
        setattr(existing_history_item, key, value)

    session.add(existing_history_item)
    session.commit()
    session.refresh(existing_history_item)
    return {
        "message": "History item updated successfully",
        "history_item": existing_history_item,
    }


@router.get("/history/", tags=["history"])
async def list_history_items(session: SessionDep):
    history_items = session.exec(select(History)).all()
    return history_items
