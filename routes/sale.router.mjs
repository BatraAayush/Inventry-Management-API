import express from "express";

import { getAllSales, addSale } from "../controllers/sale.controller.mjs";

const saleRouter = express.Router();

saleRouter.get("/sales", async (req, res) => {
  try {
    const allSales = await getAllSales();

    res
      .status(200)
      .json({ message: "Sales fetched successfully", sales: allSales });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all sales" });
  }
});

saleRouter.post("/sales", async (req, res) => {
  try {
    const saleData = req.body;

    const addedSale = await addSale(saleData);

    if (!addedSale) {
      res.status(404).json({ error: "Unable to add sale" });
    }

    res.status(201).json({ message: "Sale added successfully", addedSale });
  } catch (error) {
    res.status(500).json({ error: "Failed to add sale" });
  }
});

export { saleRouter };
