from sqlalchemy.orm import Session
from typing import List, Optional

from models import Item
from schemas import ItemCreate, Item as ItemSchema

# Create an item
def create_item(db: Session, item_data: ItemCreate) -> ItemSchema:
    db_item = Item(
        name=item_data.name,
        password=item_data.password,
        description=item_data.description
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

# Get all items
def get_items(db: Session) -> List[ItemSchema]:
    return db.query(Item).all()

# Get a single item by ID
def get_item(db: Session, item_id: int) -> Optional[ItemSchema]:
    return db.query(Item).filter(Item.id == item_id).first()

# Update an item
def update_item(db: Session, item_id: int, item_data: ItemCreate) -> Optional[ItemSchema]:
    db_item = db.query(Item).filter(Item.id == item_id).first()
    if db_item is None:
        return None
    db_item.name = item_data.name
    db_item.password = item_data.password
    db_item.description = item_data.description
    db.commit()
    db.refresh(db_item)
    return db_item

# Delete an item
def delete_item(db: Session, item_id: int) -> bool:
    db_item = db.query(Item).filter(Item.id == item_id).first()
    if db_item is None:
        return False
    db.delete(db_item)
    db.commit()
    return True
