from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class BaseConfig(BaseSettings):
    pass


class Config(BaseConfig):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)


config = Config()
