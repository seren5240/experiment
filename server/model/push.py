import os
from sqlalchemy import create_engine
from base import Base

DATABASE_URL = os.getenv("DATABASE_URL")


def create_tables():
    engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(engine)


if __name__ == "__main__":
    create_tables()
