import os
from sqlalchemy import create_engine
from model.base import Base


def create_tables():
    engine = create_engine(os.getenv("DATABASE_URL"))
    Base.metadata.create_all(engine)


if __name__ == "__main__":
    create_tables()
