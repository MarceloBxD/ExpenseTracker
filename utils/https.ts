import axios from "axios";
import { Expenses } from "./filterRecentExpenses";

export const DEFAULT_URL =
  "https://expensetracker-9841a-default-rtdb.firebaseio.com/";

export async function getExpenses() {
  try {
    const response = await axios.get(DEFAULT_URL + "/expenses.json");
    return response.data;
  } catch (e) {
    console.error("Error loading expenses", e);
  }
}

export async function createExpense(expenseData: Omit<Expenses, "id">) {
  try {
    await axios.post(DEFAULT_URL + "/expenses.json", expenseData);
  } catch (e) {
    console.error("Error adding expense", e);
  }
}

export async function updateExpenseFB(
  expenseData: Omit<Expenses, "id">,
  id: string
) {
  try {
    await axios.put(DEFAULT_URL + `/expenses/${id}.json`, expenseData);
  } catch (e) {
    console.error("Error updating expense", e);
  }
}

export async function deleteExpense(id: string) {
  try {
    await axios.delete(DEFAULT_URL + `/expenses/${id}.json`);
  } catch (e) {
    console.error("Error deleting expense", e);
  }
}
