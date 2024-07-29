import { createContext, useContext, useReducer } from "react";
import { filterRecentExpenses } from "../utils/filterRecentExpenses";

type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

export const ExpensesContext = createContext({
  expenses: [] as Expense[],
  addExpense: ({ description, amount, date }: any) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (
    id: string,
    { description, amount, date }: Omit<Expense, "id">
  ) => {},
});

export const ExpensesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  function expensesReducer(state: Expense[], action: any) {
    switch (action.type) {
      case "ADD_EXPENSE":
        const id = new Date().toString() + Math.random().toString();
        return [...state, { ...action.payload, id }];
      case "DELETE_EXPENSE":
        return state.filter((expense) => expense.id !== action.payload);
      case "UPDATE_EXPENSE":
        const toBeUpdatedIndex = state.findIndex(
          (expense) => expense.id === action.payload.id
        );
        const expenseToUpdate = state[toBeUpdatedIndex];
        const updatedItem = { ...expenseToUpdate, ...action.payload.data };
        const updatedExpenses = [...state];
        updatedExpenses[toBeUpdatedIndex] = updatedItem;
        return updatedExpenses;
      default:
        return state;
    }
  }

  const DUMMY_EXPENSES: Expense[] = [];

  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData: Omit<Expense, "id">) {
    dispatch({ type: "ADD_EXPENSE", payload: expenseData });
  }

  function updateExpense(
    id: string,
    expenseData: {
      description: string;
      amount: number;
      date: Date;
    }
  ) {
    dispatch({
      type: "UPDATE_EXPENSE",
      payload: { id: id, data: expenseData },
    });
  }

  function deleteExpense(id: string) {
    console.log("id", id);
    dispatch({ type: "DELETE_EXPENSE", payload: id });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within a ExpensesProvider");
  }
  return context;
};
