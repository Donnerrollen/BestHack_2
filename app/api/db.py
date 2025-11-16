from fastapi import APIRouter, Depends, Response, status
from loguru import logger
from fastapi.responses import HTMLResponse
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.engine import get_db_connection

from app.db.crud import get_addr, add_address

router = APIRouter()


@router.get("/api/db/get/")
async def get(session: AsyncSession = Depends(get_db_connection)) -> list:
    return list(await get_addr(session))


@router.post("/api/db/add/", response_class=HTMLResponse)
async def add(
    address: str,
    lon: float,
    lat: float,
    session: AsyncSession = Depends(get_db_connection),
) -> Response:
    try:
        await add_address(session, address, lat, lon)
    except Exception as e:
        logger.info(e)
        return Response(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(status_code=status.HTTP_200_OK)
