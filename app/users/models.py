from pydantic import BaseModel
from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True)
    password: str


class UserModel(BaseModel):
    username: str
    password: str


class UserChangeUsername(UserModel):
    new_username: str


class UserChangePassword(UserModel):
    new_password: str
