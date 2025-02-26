from sqlmodel import create_engine

# PostgreSQL connection settings
postgres_user = "postgres"
postgres_password = "postgres"
postgres_host = "postgres"
postgres_port = "5432"
postgres_db = "postgres"

postgres_url = f"postgresql://{postgres_user}:{postgres_password}@{postgres_host}:{postgres_port}/{postgres_db}"
engine = create_engine(postgres_url)
