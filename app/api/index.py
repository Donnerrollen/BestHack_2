from fastapi import APIRouter
from fastapi.responses import HTMLResponse, FileResponse
from app.ai.core import embed

from loguru import logger

router = APIRouter()


@router.get("/", response_class=HTMLResponse)
async def index() -> FileResponse:
    return FileResponse("app/static/index.html")


@router.post("/api/search/")
async def get_user_text(line: dict) -> list:
    result = {"id": 1, "address": "assress", "lat": 0.0, "lon": 0.0, "score": 100.0}
    logger.info(embed(line["line"]))
    logger.info(line)
    logger.info(result)
    return [result]
