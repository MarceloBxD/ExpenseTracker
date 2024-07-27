import { createContext, useContext, useReducer } from "react";

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
        return state.filter((expense) => expense.id !== action.payload.id);
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

  const DUMMY_EXPENSES: Expense[] = [
    {
      id: "e1",
      description: "Toilet Paper",
      amount: 94.12,
      date: new Date(2024, 6, 18),
    },
    {
      id: "e2",
      description: "New TV",
      amount: 799.49,
      date: new Date(2024, 6, 19),
    },
    {
      id: "e3",
      description: "Car Insurance",
      amount: 294.67,
      date: new Date(2024, 4, 21),
    },
    {
      id: "e4",
      description: "New Desk (Wooden)",
      amount: 450,
      date: new Date(2024, 6, 12),
    },
    {
      id: "e5",
      description: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 5, 14),
    },
    {
      id: "e6",
      description: "New Iphone",
      amount: 94.12,
      date: new Date(2020, 12, 14),
    },
  ];

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
