import os
from pymongo import MongoClient
from dotenv import load_dotenv

# load variables from .env file so we don't hardcode secrets in code
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

# one client for the whole app, mongo driver handles connection pooling internally
# so we don't need to open/close connection on every request
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# collections we'll be using across the app
users_collection = db["users"]
scans_collection = db["scans"]
