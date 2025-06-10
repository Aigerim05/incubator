from database import Base, engine
from models import Item

def create_tables():
    try:
        print("🔧 Creating tables...")
        Base.metadata.create_all(bind=engine)
        print("✅ Tables created successfully.")
    except Exception as e:
        print("❌ Error creating tables:", e)
