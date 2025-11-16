import sys
from app.storage import storage
from pathlib import Path


from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from loguru import logger
from app.api.register import register_routers
from fastapi.middleware.cors import CORSMiddleware
from app.ai.parce import parse_embs


class Application:
    def __init__(self) -> None:
        return

    def __setup_logger(self) -> None:
        logger.remove()
        logger.add(sys.stdout, level="INFO")

    async def setup(self) -> FastAPI:
        self.__setup_logger()

        logger.info("Initialization...")

        app = FastAPI(
            title="GradIent",
            version="0.0.0",
        )

        app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

        storage.ADDRESES, storage.TENSORS = parse_embs()

        register_routers(app)
        app.mount("/static", StaticFiles(directory=Path("app/static"), html=True))

        logger.info("Initialization complete")
        return app
