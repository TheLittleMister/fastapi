from fastapi import APIRouter, HTTPException
from sqlmodel import select
from dependencies import SessionDep
from cart.models import Cart, CartModel, CartChange, CartDelete
from products.models import Product
from users.models import User

router = APIRouter()


@router.post("/cart/", tags=["cart"])
async def add_to_cart(cart_item: CartModel, session: SessionDep):
    existing_user = session.exec(
        select(User).where(User.id == cart_item.user_id)
    ).first()
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    existing_product = session.exec(
        select(Product).where(Product.id == cart_item.product_id)
    ).first()
    if not existing_product:
        raise HTTPException(status_code=404, detail="Product not found")

    new_cart_item = Cart(**cart_item.dict())
    session.add(new_cart_item)
    session.commit()
    session.refresh(new_cart_item)
    return {"message": "Item added to cart successfully", "cart_item": new_cart_item}


@router.put("/cart/", tags=["cart"])
async def update_cart_item(cart_item: CartChange, session: SessionDep):
    existing_cart_item = session.get(Cart, cart_item.id)
    if not existing_cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    for key, value in cart_item.dict().items():
        setattr(existing_cart_item, key, value)

    session.add(existing_cart_item)
    session.commit()
    session.refresh(existing_cart_item)
    return {
        "message": "Cart item updated successfully",
        "cart_item": existing_cart_item,
    }


@router.delete("/cart/", tags=["cart"])
async def delete_cart_item(cart_item: CartDelete, session: SessionDep):
    existing_cart_item = session.get(Cart, cart_item.id)
    if not existing_cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    session.delete(existing_cart_item)
    session.commit()
    return {"message": "Cart item deleted successfully"}


@router.get("/cart/", tags=["cart"])
async def list_cart_items(session: SessionDep):
    cart_items = session.exec(select(Cart)).all()
    return cart_items
