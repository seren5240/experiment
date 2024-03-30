import os
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from model.base import Base

engine = create_engine(os.getenv("DATABASE_URL"))
session = Session(engine)


def create_tables():
    Base.metadata.create_all(engine)


if __name__ == "__main__":
    create_tables()
