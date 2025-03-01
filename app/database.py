from sqlmodel import create_engine

DOCKER = False

if DOCKER:
    # PostgreSQL connection settings
    postgres_user = "postgres"
    postgres_password = "postgres"
    postgres_host = "postgres"
    postgres_port = "5432"
    postgres_db = "postgres"

    postgres_url = f"postgresql://{postgres_user}:{postgres_password}@{postgres_host}:{postgres_port}/{postgres_db}"
    engine = create_engine(postgres_url)

else:
    sqlite_file_name = "database.db"
    sqlite_url = f"sqlite:///{sqlite_file_name}"

    connect_args = {"check_same_thread": False}
    engine = create_engine(sqlite_url, connect_args=connect_args)
