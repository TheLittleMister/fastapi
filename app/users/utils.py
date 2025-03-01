from datetime import timedelta
from jose import jwt
from datetime import datetime

# Secret key to encode the JWT token
SECRET_KEY = "y0!u^^r$jty@!!0cvsvlk*uuvdp4gsi1*7s136^wln+_5p4nu4"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
