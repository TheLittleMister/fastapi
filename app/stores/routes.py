from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select
from dependencies import SessionDep, get_current_user
from stores.models import Store, StoreModel, StoreChange, StoreDelete
from users.models import User

router = APIRouter()


@router.post("/stores/", tags=["stores"])
async def create_store(
    store: StoreModel,
    session: SessionDep,
    current_user: User = Depends(get_current_user),
):
    existing_user = session.exec(select(User).where(User.id == store.user_id)).first()

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    new_store = Store(**store.dict())
    session.add(new_store)
    session.commit()
    session.refresh(new_store)
    return {"message": "Store created successfully", "store": new_store}


@router.put("/stores/", tags=["stores"])
async def update_store(
    store: StoreChange,
    session: SessionDep,
    current_user: User = Depends(get_current_user),
):
    existing_store = session.get(Store, store.id)
    if not existing_store:
        raise HTTPException(status_code=404, detail="Store not found")

    for key, value in store.dict().items():
        setattr(existing_store, key, value)

    session.add(existing_store)
    session.commit()
    session.refresh(existing_store)
    return {"message": "Store updated successfully", "store": existing_store}


@router.delete("/stores/", tags=["stores"])
async def delete_store(
    store: StoreDelete,
    session: SessionDep,
    current_user: User = Depends(get_current_user),
):
    existing_store = session.get(Store, store.id)
    if not existing_store:
        raise HTTPException(status_code=404, detail="Store not found")

    session.delete(existing_store)
    session.commit()
    return {"message": "Store deleted successfully"}


@router.get("/stores/", tags=["stores"])
async def list_stores(
    session: SessionDep, current_user: User = Depends(get_current_user)
):
    stores = session.exec(select(Store)).all()
    return stores
