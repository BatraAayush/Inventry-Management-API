import mongoose from 'mongoose';
import { Item } from '../models/item.model.mjs';

const getAllItems = async () => {
  try {
    const items = await Item.find()
    
    return items
  } catch (error) {
    throw error
  }
}

const addItem = async (itemData) => {
  try {
    const item = new Item(itemData)
    
    const addedItem = await item.save()
    
    return addedItem
  } catch (error) {
    throw error
  }
}

const deleteItem = async (itemId) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(itemId)
    
    return deletedItem
  } catch (error) {
    throw error
  }
}

const updateItem = async (itemId, itemData) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(itemId, itemData, { new: true })

    return updatedItem
  } catch (error) {
    throw error
  }
}

export { getAllItems, addItem, deleteItem, updateItem };