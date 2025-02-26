from pydantic import BaseModel
from sqlmodel import Field, SQLModel


class Product(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    store_id: int = Field(foreign_key="store.id")
    name: str
    description: str
    price: float
    stock: int


class ProductModel(BaseModel):
    user_id: int
    name: str
    description: str
    price: float
    stock: int


class ProductChange(BaseModel):
    id: int
    name: str
    description: str
    price: float
    stock: int


class ProductDelete(BaseModel):
    id: int
