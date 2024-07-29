import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  createExpense,
  getExpenses,
  updateExpenseFB,
  deleteExpense as deleteExpenseFB,
} from "../utils/https";

type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

export const ExpensesContext = createContext({
  expenses: [] as Expense[],
  addExpense: ({ description, amount, date }: Omit<Expense, "id">) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (
    id: string,
    { description, amount, date }: Omit<Expense, "id">
  ) => {},
  isFetching: false,
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
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        setIsFetching(true);
        const response = await getExpenses();
        if (response === null) {
          setIsFetching(false);
          return;
        }

        const loadedExpenses = Object.keys(response).map((key) => ({
          id: key,
          description: response[key].description,
          amount: response[key].amount,
          date: new Date(response[key].date),
        }));

        dispatch({ type: "SET_EXPENSES", payload: loadedExpenses });

        setIsFetching(false);
      } catch (e) {
        console.error("Error loading expenses", e);
        setIsFetching(false);
      }
    };

    loadExpenses();
  }, []);

  async function addExpense(expenseData: Omit<Expense, "id">) {
    try {
      setIsFetching(true);
      await createExpense(expenseData);
      dispatch({ type: "ADD_EXPENSE", payload: expenseData });
      setIsFetching(false);
    } catch (e) {
      console.error("Error adding expense", e);
      setIsFetching(false);
    }
  }

  async function updateExpense(
    id: string,
    expenseData: {
      description: string;
      amount: number;
      date: Date;
    }
  ) {
    try {
      setIsFetching(true);
      await updateExpenseFB(expenseData, id);
      dispatch({
        type: "UPDATE_EXPENSE",
        payload: { id, data: expenseData },
      });
      setIsFetching(false);
    } catch (e) {
      console.error("Error updating expense", e);
      setIsFetching(false);
    }
  }

  async function deleteExpense(id: string) {
    try {
      await deleteExpenseFB(id);
      dispatch({ type: "DELETE_EXPENSE", payload: id });
    } catch (e) {
      console.error("Error deleting expense", e);
    }
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
    isFetching,
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
