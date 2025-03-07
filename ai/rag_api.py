
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
import chromadb
from sqlalchemy import create_engine
import pandas as pd
import os
from dotenv import load_dotenv

# **1. Flask setup**
app = Flask(__name__)
CORS(app)

# **2.Setting Gemini API Key 
load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")
client = genai.Client(api_key=API_KEY)

# **3. PostgreSQL Database connection**

username = os.getenv("PG_USERNAME")
password = os.getenv("PG_PASSWORD")
hostname = os.getenv("PG_HOST")
database = os.getenv("PG_DATABASE")

db_uri = f"postgresql://{username}:{password}@{hostname}:5432/{database}?sslmode=require"
engine = create_engine(db_uri)

# **4. Retrieve information from database**
query = """
    SELECT * FROM all_info
"""
df = pd.read_sql(query, engine)

# **5. Convert data into text format**
df["text"] = df.apply(lambda row: f"""
Product Overview:
- Product ID: {row['product_id']}
- Name: {row['product_name']}
- Image URL: {row['product_image']}
- Place of Origin: {row['place_of_origin']}
- Manufacturing Location: {row['manufacturing_location']}
- Weight & Volume: {row['weight_volume']}
- Features & Description: {row['features_desc']}

Material Information:
- Material Category: {row['material_cat_name']} (Category ID: {row['material_cat_id']})
- Material Form: {row['material_form_name']} (Form ID: {row['material_form_id']})

Health Benefits & Ingredients:
- Health Claims: {row['healthclaim_name']}
- Key Ingredients: {row['ingredients_name']}

Application & Use Cases:
- Application Name: {row['application_name']}
- Application Description: {row['application_desc']}

Supplier Details:
- Supplier Name: {row['supplier_name']}
- Supplier Category: {row['supplier_cat_name']} (Category ID: {row['supplier_cat_id']})
- Location: {row['supplier_city']}, {row['supplier_province_state']}, {row['supplier_country']}
- Postal Code: {row['supplier_postalcode']}
""", axis=1)

# **6. Define embedding model**
def get_embedding(text):
    response = client.models.embed_content(
        model="models/text-embedding-004",
        contents=text,
    )
    return response.embeddings[0].values

# **7. Process vectorDB **
vector_db = chromadb.PersistentClient(path="./chroma_db")
vector_db.delete_collection(name="functional_products")
collection = vector_db.get_or_create_collection(name="functional_products")


for _, row in df.iterrows():
    embedding_vector = get_embedding(row["text"])
    collection.add(
        ids=[str(row["product_name"])], 
        embeddings=[embedding_vector], 
        documents=[row["text"]]
    )

# **8. Retrieve from vectorDB **
def retrieve_from_vector_db(input_text):
    query_embedding = get_embedding(input_text)
    results = collection.query(query_embeddings=[query_embedding], n_results=5)

    if not results["documents"] or not results["documents"][0]:
        return "No relevant information found."

    return results["documents"][0]

# **9. Prompt engineering setup**
def ask_gemini(context, input_text):
    prompt =  f"""
    You are an AI assistant answering product-related questions. 
    Use the following retrieved product information to generate a concise response.

    Below is the relevant product information retrieved from the database: "{context}"

    The user asked: "{input_text}"
    
    If the context contains the answer, reply concisely using the provided details.
    If the context does not have the answer, say: "I'm sorry, I don't have enough details."

    Always keep the response within 30 words.
    """
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[prompt])
    return response.candidates[0].content.parts[0].text.strip()

# **10. Flask API**
@app.route("/ask", methods=["POST"])
def ask_question():

    data = request.json
    input_text = data.get("question", "").strip()
    
    if not input_text:
        return jsonify({"error": "No question provided"}), 400

    retrieval_results = retrieve_from_vector_db(input_text)
    context = retrieval_results if retrieval_results else []

    answer = ask_gemini(context, input_text)

    return jsonify({"answer": answer})

# **Start Flask API**
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001)

