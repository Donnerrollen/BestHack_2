from pydantic import BaseModel


class ResultAdress(BaseModel):
    id: int
    addres: str
    lat: float
    lon: float
    score: float
