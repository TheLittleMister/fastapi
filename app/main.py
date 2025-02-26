from fastapi import FastAPI
from sqlmodel import SQLModel
from database import engine

from users import routes as user_routes
from products import routes as product_routes
from stores import routes as store_routes
from cart import routes as cart_routes
from history import routes as history_routes


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


tags_metadata = [
    {
        "name": "users",
        "description": "Operations with users. The **login** logic is also here.",
    },
    {
        "name": "products",
        "description": "Manage products. So _fancy_ they have their own docs.",
    },
    {"name": "stores", "description": "Manage stores."},
    {"name": "cart", "description": "Manage cart."},
    {"name": "history", "description": "Manage history."},
]

app = FastAPI(
    title="My API",
    description="This is a very fancy project, with auto docs for the API and everything",
    version="0.1.0",
    openapi_tags=tags_metadata,
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


app.include_router(user_routes.router)
app.include_router(product_routes.router)
app.include_router(store_routes.router)
app.include_router(cart_routes.router)
app.include_router(history_routes.router)
