from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.pool import NullPool
from sqlalchemy.orm import DeclarativeBase
from datetime import timedelta

from app.config import config


class Base(DeclarativeBase):
    def to_dict(self, visited=None):
        if visited is None:
            visited = set()

        final_dict = {}
        visited.add(id(self))

        for field, value in self.__dict__.items():
            if isinstance(value, list) and value and hasattr(value[0], "to_dict"):
                new_list = []
                for v in value:
                    if id(v) not in visited:
                        visited.add(id(v))
                        new_list.append(v.to_dict(visited))
                final_dict[field] = new_list
            elif hasattr(value, "to_dict") and id(value) not in visited:
                visited.add(id(value))
                final_dict[field] = value.to_dict(visited)  # type: ignore
            elif field[0] != "_":
                if isinstance(value, timedelta):
                    final_dict[field] = value
                else:
                    final_dict[field] = str(value) if value is not None else None

        return final_dict


engine = create_async_engine(
    config.DATABASE_URL,
    poolclass=NullPool,
    future=True,
)

async_session = async_sessionmaker(
    autoflush=False, bind=engine, expire_on_commit=False, class_=AsyncSession
)


async def get_db_connection() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
