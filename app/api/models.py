from pydantic import BaseModel


class SearchLine(BaseModel):
    text: str


class ResultAdress(BaseModel):
    id: int
    addres: str
    lat: float
    lon: float
    score: float
