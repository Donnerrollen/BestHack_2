import asyncio
import uvicorn
from app.asgi import Application


if __name__ == "__main__":
    app = Application()
    asgi_app = asyncio.run(app.setup())
    uvicorn.run(app=asgi_app, host="0.0.0.0", port=8000)
