from typing import Annotated, Generator

from google import genai

from fastapi import Depends
from sqlmodel import Session

from core.vector_db import VectorSession, vector_session
from core.config import settings
from core.db import engine

def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session

def get_ai_client() -> Generator[genai.Client, None, None]:
    client = genai.Client(api_key=settings.GOOGLE_API_KEY)
    yield client

def get_vector_session() -> Generator[VectorSession, None, None]:
    yield vector_session


SessionDep = Annotated[Session, Depends(get_db)]
AIClientDep = Annotated[genai.Client, Depends(get_ai_client)]
VectorSessionDep = Annotated[VectorSession, Depends(get_vector_session)]
