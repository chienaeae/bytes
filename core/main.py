import asyncio
import json
from fastapi import APIRouter, FastAPI
from fastapi.concurrency import asynccontextmanager
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlmodel import Session
from sqlalchemy.orm import joinedload
from google import genai
from core.models.product import Product, ProductDetail
from core.vector_db import vector_session
from core.db import engine
from core.api.routes import chat, products, products_with_filter
from core.config import settings

def prepare_vector_db():
    with Session(engine) as session:
        collection = vector_session.get_product_collection()

        ai_client = genai.Client(api_key=settings.GOOGLE_API_KEY)

        products = session.scalars(statement=select(Product).options(
            joinedload(Product.material_cat),
            joinedload(Product.material_form),
            joinedload(Product.applications),
            joinedload(Product.ingredients),
            joinedload(Product.suppliers),
            joinedload(Product.healthclaims)
        )).unique().all()

        if (len(products) == 0):
            print("No products found")
            exit()

        for product in products:
            product_detail = ProductDetail.from_orm(product)
            data = product_detail.model_dump(mode="json", by_alias=True)
            data_str = json.dumps(data)
            
            embedding_vectors = ai_client.models.embed_content(
                model="models/text-embedding-004",
                contents=data_str,
            ).embeddings[0].values

            collection.add(
                ids=[str(product.product_id)], 
                embeddings=[embedding_vectors], 
                documents=[data_str]
            )
        

@asynccontextmanager
async def lifespan(app: FastAPI):
    prepare_vector_db()
    print("Vector database prepared")
    yield
    vector_session.clean_up()
    print("Vector database cleaned up")

app = FastAPI(lifespan=lifespan)

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
api_router.include_router(chat.router)

app.include_router(api_router)
