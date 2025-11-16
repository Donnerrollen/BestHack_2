from fastapi import APIRouter
from fastapi.responses import HTMLResponse, FileResponse
from app.storage import storage

from app.ai.core import cos_dit

router = APIRouter()


@router.get("/", response_class=HTMLResponse)
async def index() -> FileResponse:
    return FileResponse("app/static/index.html")


@router.post("/search/")
async def get_user_text(line: dict):
    ai_points = cos_dit(line["line"])
    out_data = {"searched_address": line["line"], "objects": []}

    for ai_point in ai_points:
        db_address = storage.ADDRESES[int(ai_point[0])]
        address = db_address[1].split(", ")
        out_data["objects"].append(
            {
                "locality": address[0],
                "street": address[1],
                "number": address[2],
                "lat": db_address[2],
                "lon": db_address[3],
                "score": ai_point[1],
            }
        )
    return out_data

@router.post("/api/test/")
async def get_user_text(line: str):
    ai_points = cos_dit(line)
    out_data = {"searched_address": line, "objects": []}

    for ai_point in ai_points:
        db_address = storage.ADDRESES[int(ai_point[0])]
        address = db_address[1].split(", ")
        out_data["objects"].append(
            {
                "locality": address[0],
                "street": address[1],
                "number": address[2],
                "lat": db_address[2],
                "lon": db_address[3],
                "score": ai_point[1],
            }
        )
    return out_data
