from typing import List, Optional
from schemas import Item, ItemCreate

# In-memory items list
items: List[dict] = []
current_id = 1

def create_item(item_data: ItemCreate) -> Item:
    global current_id
    item = {
        'id': current_id,
        'name': item_data.name,
        'password': item_data.password,
        'description': item_data.description
    }
    items.append(item)
    current_id += 1
    return Item(**item)

def get_items() -> List[Item]:
    return [Item(**item) for item in items]

def get_item(item_id: int) -> Optional[Item]:
    for item in items:
        if item['id'] == item_id:
            return Item(**item)
    return None

def update_item(item_id: int, item_data: ItemCreate) -> Optional[Item]:
    for item in items:
        if item['id'] == item_id:
            item['name'] = item_data.name
            item['password'] = item_data.password
            item['description'] = item_data.description
            return Item(**item)
    return None

def delete_item(item_id: int) -> bool:
    global items
    original_len = len(items)
    items = [item for item in items if item['id'] != item_id]
    return len(items) < original_len
