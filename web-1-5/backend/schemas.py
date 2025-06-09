from pydantic import BaseModel

# Base schema for input (no ID yet)
class ItemBase(BaseModel):
    name: str
    password: str
    description: str

# Schema for creating a new item (same as base)
class ItemCreate(ItemBase):
    pass

# Schema for responses (includes ID)
class Item(ItemBase):
    id: int

    class Config:
        pass
