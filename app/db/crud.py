from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.schema import Address


async def add_address(
    session: AsyncSession,
    address: str,
    lat: float,
    lon: float,
) -> None:
    addr = Address(address=address, lat=lat, lon=lon)
    session.add(addr)
    await session.flush()
    await session.refresh(addr)


async def get_addr(
    session: AsyncSession,
) -> list[Address]:
    query = select(Address)
    addreses = (await session.execute(query)).scalars().all()
    return list(addreses)
