from sqlalchemy.orm import Mapped, mapped_column
from app.db.engine import Base


class Address(Base):
    __tablename__ = "addresses"

    id: Mapped[int] = mapped_column(primary_key=True)
    address: Mapped[str] = mapped_column()
    lat: Mapped[float] = mapped_column()
    lon: Mapped[float] = mapped_column()
