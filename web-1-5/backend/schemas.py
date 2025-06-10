from pydantic import BaseModel

# ✅ Shared properties (used for both creation and response)
class ItemBase(BaseModel):
    name: str
    password: str
    description: str

# ✅ Used when creating a new item (from POST body)
class ItemCreate(ItemBase):
    pass

# ✅ Used when returning item data from the database
class Item(ItemBase):
    id: int

    class Config:
        orm_mode = True  # Important to read data from SQLAlchemy model
