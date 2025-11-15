from fastapi import APIRouter
from fastapi.responses import HTMLResponse, FileResponse


router = APIRouter()


@router.get("/", response_class=HTMLResponse)
async def index():
    return FileResponse("app/static/index.html")


@router.post("/api/search/")
async def get_user_text(json: dict):
    return {
        "results": [
            {
                "id": 1,
                "address": "ул. Примерная, 1, Москва, Россия",
                "lat": 55.753544,
                "lng": 37.621202,
                "score": 85,
            },
            {
                "id": 2,
                "address": "пр. Тестовый, 15, Москва, Россия",
                "lat": 55.754544,
                "lng": 37.622202,
                "score": 92,
            },
            {
                "id": 3,
                "address": "пер. Демонстрационный, 7, Москва, Россия",
                "lat": 55.755544,
                "lng": 37.623202,
                "score": 76,
            },
        ]
    }
