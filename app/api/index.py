from fastapi import APIRouter
from fastapi.responses import HTMLResponse, FileResponse


router = APIRouter()


@router.get("/", response_class=HTMLResponse)
async def index():
    return FileResponse("app/static/index.html")


@router.post("/api/search/")
async def get_user_text(json: dict):
    return json
