import axios from "axios";
import type { Item, ItemCreate } from '../types/item';

const BASE_URL = "http://localhost:8000";

export const getItems = async (): Promise<Item[]> => {
    const response = await axios.get<Item[]>(`${BASE_URL}/items`);
    return response.data;
};

export const getItem = async (id: number): Promise<Item> => {
    const response = await axios.get<Item>(`${BASE_URL}/items/${id}`);
    return response.data;
  };
  
  export const createItem = async (item: ItemCreate): Promise<Item> => {
    const response = await axios.post<Item>(`${BASE_URL}/items`, item);
    return response.data;
  };
  
  export const updateItem = async (id: number, item: ItemCreate): Promise<Item> => {
    const response = await axios.put<Item>(`${BASE_URL}/items/${id}`, item);
    return response.data;
  };
  
  export const deleteItem = async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/items/${id}`);
  };