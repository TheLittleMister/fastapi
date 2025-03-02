from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select
from dependencies import SessionDep, get_current_user
from products.models import Product, ProductModel, ProductChange, ProductDelete

from users.models import User


router = APIRouter()


@router.post("/products/", tags=["products"])
async def create_product(
    product: ProductModel,
    session: SessionDep,
    current_user: User = Depends(get_current_user),
):
    existing_user = session.exec(select(User).where(User.id == product.user_id)).first()

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    new_product = Product(**product.dict())
    session.add(new_product)
    session.commit()
    session.refresh(new_product)
    return {"message": "Product created successfully", "product": new_product}


@router.put("/products/", tags=["products"])
async def update_product(
    product: ProductChange,
    session: SessionDep,
    current_user: User = Depends(get_current_user),
):
    existing_product = session.get(Product, product.id)
    if not existing_product:
        raise HTTPException(status_code=404, detail="Product not found")

    for key, value in product.dict().items():
        setattr(existing_product, key, value)

    session.add(existing_product)
    session.commit()
    session.refresh(existing_product)
    return {"message": "Product updated successfully", "product": existing_product}


@router.delete("/products/", tags=["products"])
async def delete_product(
    product: ProductDelete,
    session: SessionDep,
    current_user: User = Depends(get_current_user),
):
    existing_product = session.get(Product, product.id)
    if not existing_product:
        raise HTTPException(status_code=404, detail="Product not found")

    session.delete(existing_product)
    session.commit()
    return {"message": "Product deleted successfully"}


@router.get("/products/", tags=["products"])
async def list_products(
    session: SessionDep, current_user: User = Depends(get_current_user)
):
    products = session.exec(select(Product)).all()
    return products
