from fastapi import APIRouter, Depends
from fastapi.responses import HTMLResponse
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.engine import get_db_connection

from app.db.crud import get_addr, add_address

router = APIRouter()


@router.get("/api/db/add/", response_class=HTMLResponse)
async def add(
    address: str,
    lon: float,
    lat: float,
    session: AsyncSession = Depends(get_db_connection),
):
    await add_address(session, address, lat, lon)


@router.post("/api/db/get/")
async def get(session: AsyncSession = Depends(get_db_connection)):
    await get_addr(session)
