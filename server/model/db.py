import os
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from model.base import Base

DATABASE_URL = os.getenv("DATABASE_URL")
async_engine = create_async_engine(DATABASE_URL, echo=True)

AsyncSessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=async_engine, class_=AsyncSession
)


async def get_db_session():
    async with AsyncSessionLocal() as session:
        yield session


def create_tables():
    engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(engine)


if __name__ == "__main__":
    create_tables()
