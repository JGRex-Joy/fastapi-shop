from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    app_name: str = "FastAPI Shop"
    debug: bool = True
    database_url: str = os.getenv("DATABASE_URL")
    cors_origins: list = ["*"]
    
    class Config:
        env_file = ".env"

settings = Settings()    