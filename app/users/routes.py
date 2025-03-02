from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select
import bcrypt
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta

from users.utils import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from users.models import User, UserModel, UserChangeUsername, UserChangePassword
from dependencies import SessionDep, get_current_user

router = APIRouter()


@router.post("/signup/", tags=["users"])
async def create_user(user: UserModel, session: SessionDep):
    # Verificar si el usuario ya existe
    existing_user = session.exec(
        select(User).where(User.username == user.username)
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt()).decode()

    new_user = User(username=user.username, password=hashed_password)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return {
        "message": "User created successfully",
        "user": {"id": new_user.id, "username": new_user.username},
    }


"""
@router.post("/login/", tags=["users"])
async def login_user(user: UserModel, session: SessionDep):
    existing_user = session.exec(
        select(User).where(User.username == user.username)
    ).first()

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not bcrypt.checkpw(user.password.encode(), existing_user.password.encode()):
        raise HTTPException(status_code=401, detail="Invalid password")

    return {"message": "Login successful"}
"""


@router.post("/login/", tags=["users"])
async def login(session: SessionDep, form_data: OAuth2PasswordRequestForm = Depends()):
    user = session.exec(select(User).where(User.username == form_data.username)).first()
    if not user or not bcrypt.checkpw(
        form_data.password.encode(), user.password.encode()
    ):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    user.token = access_token  # Save the token in the user's record
    session.add(user)
    session.commit()
    return {"access_token": access_token, "token_type": "bearer"}


@router.put("/change_username/", tags=["users"])
async def change_username(
    user: UserChangeUsername,
    session: SessionDep,
    current_user: User = Depends(get_current_user),
):
    existing_user = session.exec(
        select(User).where(User.username == user.username)
    ).first()

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not bcrypt.checkpw(user.password.encode(), existing_user.password.encode()):
        raise HTTPException(status_code=401, detail="Invalid password")

    existing_user.username = user.new_username
    session.add(existing_user)
    session.commit()
    session.refresh(existing_user)

    return {"message": "Username changed successfully"}


@router.put("/change_password/", tags=["users"])
async def change_password(
    user: UserChangePassword,
    session: SessionDep,
    current_user: User = Depends(get_current_user),
):
    existing_user = session.exec(
        select(User).where(User.username == user.username)
    ).first()

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not bcrypt.checkpw(user.password.encode(), existing_user.password.encode()):
        raise HTTPException(status_code=401, detail="Invalid old password")

    hashed_new_password = bcrypt.hashpw(
        user.new_password.encode(), bcrypt.gensalt()
    ).decode()
    existing_user.password = hashed_new_password
    session.add(existing_user)
    session.commit()
    session.refresh(existing_user)

    return {"message": "Password changed successfully"}


@router.delete("/delete_user/", tags=["users"])
async def delete_user(
    user: UserModel, session: SessionDep, current_user: User = Depends(get_current_user)
):
    existing_user = session.exec(
        select(User).where(User.username == user.username)
    ).first()
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not bcrypt.checkpw(user.password.encode(), existing_user.password.encode()):
        raise HTTPException(status_code=401, detail="Invalid password")

    session.delete(existing_user)
    session.commit()

    return {"message": "User deleted successfully"}


@router.get("/users/", tags=["users"])
async def list_users(
    session: SessionDep, current_user: User = Depends(get_current_user)
):
    users = session.exec(select(User)).all()
    return [{"id": u.id, "username": u.username, "password": u.password} for u in users]
