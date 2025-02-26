from pydantic import BaseModel
from sqlmodel import Field, SQLModel


class Cart(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    product_id: int = Field(foreign_key="product.id")
    quantity: int
    # total_price: float


class CartModel(BaseModel):
    user_id: int
    product_id: int
    quantity: int


class CartChange(BaseModel):
    id: int
    user_id: int
    product_id: int
    quantity: int


class CartDelete(BaseModel):
    id: int
