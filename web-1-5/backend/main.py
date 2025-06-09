from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from schemas import Item, ItemCreate
import crud

app = FastAPI()

# Allow React frontend to access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create
@app.post("/items", response_model=Item)
def create_item(item: ItemCreate):
    return crud.create_item(item)

# Read all
@app.get("/items", response_model=List[Item])
def read_items():
    return crud.get_items()

# Read one
@app.get("/items/{item_id}", response_model=Item)
def read_item(item_id: int):
    item = crud.get_item(item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

# Update
@app.put("/items/{item_id}", response_model=Item)
def update_item(item_id: int, item: ItemCreate):
    updated = crud.update_item(item_id, item)
    if updated is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return updated

# Delete
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    success = crud.delete_item(item_id)
    if not success:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted"}
