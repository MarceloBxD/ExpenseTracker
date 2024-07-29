import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      case "SET_EXPENSES":
        return action.payload;
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
  const [expensesEmpty, setEmptyExpenses] = useState(false);

  const STORAGE_KEY = "expenses";

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const expenses = await AsyncStorage.getItem(STORAGE_KEY);
        if (!expenses) {
          return setEmptyExpenses(true);
        }

        const parsedExpenses = JSON.parse(expenses).map((expense: Expense) => ({
          ...expense,
          date: new Date(expense.date),
        }));

        dispatch({ type: "SET_EXPENSES", payload: parsedExpenses });
      } catch (e) {
        console.error("Error loading expenses", e);
      }
    };

    loadExpenses();
  }, []);

  useEffect(() => {
    const saveExpenses = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expensesState));
      } catch (e) {
        console.error("Error saving expenses", e);
      }
    };
    saveExpenses();
  }, [expensesState]);

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
    expensesEmpty,
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
