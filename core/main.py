import asyncio
import json
from fastapi import APIRouter, FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

from core.api.routes import products, products_with_filter
from core.config import settings


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
api_router = APIRouter()
api_router.include_router(products.router)
api_router.include_router(products_with_filter.router)

app.include_router(api_router)

@app.get("/")
async def root():
    return {"message": f"Hello! This is {settings.APP_NAME}"}

messages = """Hello, how has your day been? 

When you see this message, you should know it is a mock response. 
The real response is coming soon. Hope you have a good day! 

I can give a paragraph from Shakespeare's works. 
Here is the paragraph:

To be, or not to be, that is the question:
Whether 'tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,
Or to take arms against a sea of troubles
And by opposing end them. To die: to sleep;
No more; and by a sleep to say we end
The heartache and the thousand natural shocks
That flesh is heir to, 'tis a consummation"""

async def mock_chat_generator():
    await asyncio.sleep(0.5)
    yield "event: start\ndata: start\n\n"
    buffer = ""
    for char in messages:
        buffer += char
        if (len(buffer) > 6):
            json_data = json.dumps({"m": buffer})
            yield f"data: {json_data}\n\n"
            buffer = ""
        await asyncio.sleep(0.01)
    
    if (buffer):
        json_data = json.dumps({"m": buffer})
        yield f"data: {json_data}\n\n"
    yield "event: complete\ndata: complete\n\n"

@app.get("/mock-chat")
async def mock_chat():
    return StreamingResponse(mock_chat_generator(), media_type="text/event-stream")