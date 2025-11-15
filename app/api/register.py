from fastapi import FastAPI

from app.api.index import router as index_router


def register_routers(app: FastAPI) -> None:
    app.include_router(index_router, tags=["Index"])
