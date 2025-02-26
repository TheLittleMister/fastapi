from pydantic import BaseModel
from sqlmodel import Field, SQLModel


class Store(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    name: str
    address: str
    phone: str


class StoreModel(BaseModel):
    user_id: int
    name: str
    address: str
    phone: str


class StoreChange(BaseModel):
    id: int
    name: str
    address: str
    phone: str


class StoreDelete(BaseModel):
    id: int
