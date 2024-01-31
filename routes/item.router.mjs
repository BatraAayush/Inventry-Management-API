import express from 'express';

import {
  getAllItems,
  addItem,
  deleteItem,
  updateItem
} from '../controllers/item.controller.mjs';

const itemRouter = express.Router()

itemRouter.get('/items', async (req, res) => {
  try {
    const items = await getAllItems();

    res.status(200).json({ message: 'Items fetched successfully', items: items })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the items' })
  }
})

itemRouter.post('/items', async (req, res) => {
  try {
    const itemData = req.body;
    const addedItem = await addItem(itemData);

    if (addedItem) {
      res.status(201).json({ message: 'Item added successfully', addedItem: addedItem })
    } else {
      res.status(404).json({ error: 'Unable to add item' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item' })
  }
})

itemRouter.delete('/items/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId
    const deletedItem = await deleteItem(itemId)

    if (!deletedItem) {
      res.status(404).json({ error: 'Item not found' })
    }

    res.status(201).json({ message: 'Item deleted successfully', deletedItem: deletedItem })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' })
  }
})

itemRouter.post('/items/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId
    const itemData = req.body
    const updatedItem = await updateItem(itemId, itemData)

    if (!updatedItem) {
      res.status(404).json({ error: "Item not found" })
    }

    res.status(201).json({ message: "Item updated successfully", item: updatedItem })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' })
  }
})

export { itemRouter };