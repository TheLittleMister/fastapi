from pydantic import BaseModel
from sqlmodel import Field, SQLModel

from datetime import datetime


class History(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    product_id: int = Field(foreign_key="product.id")
    timestamp: datetime = Field(default=datetime.now())
    status: str


class HistoryModel(BaseModel):
    user_id: int
    product_id: int
    status: str


class HistoryChange(BaseModel):
    id: int
    user_id: int
    product_id: int
    status: str
