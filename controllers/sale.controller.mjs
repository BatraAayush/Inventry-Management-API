import mongoose from "mongoose";
import { Sale } from "../models/sale.model.mjs";

const getAllSales = async () => {
  try {
    const sales = await Sale.find().populate({
      path: "item",
      select: "name",
    });

    return sales;
  } catch (error) {
    throw error;
  }
};

const addSale = async (saleData) => {
  try {
    const sale = new Sale(saleData);

    const savedSale = await sale.save();

    const addedSale = await savedSale.populate({
      path: "item",
      select: "name",
    });

    return addedSale;
  } catch (error) {
    throw error;
  }
};

export { getAllSales, addSale };
