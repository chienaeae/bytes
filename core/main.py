import os

from fastapi import FastAPI
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "UNKNOWN"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
app = FastAPI()


@app.get("/")
async def root():
    return {"message": f"Hello! This is {settings.app_name}"}