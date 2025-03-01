from typing import Annotated
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session, select
from database import engine
from users.models import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def get_session():
    with Session(engine) as session:
        yield session


def get_current_user(
    session: Session = Depends(get_session), token: str = Depends(oauth2_scheme)
):
    user = session.exec(select(User).where(User.token == token)).first()
    if not user:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )
    return user


SessionDep = Annotated[Session, Depends(get_session)]
