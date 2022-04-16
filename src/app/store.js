import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/books/bookSlice";
import bookIdReducer from "../features/bookId/bookIdSlice";

export const store = configureStore({
  reducer: { books: bookReducer, book: bookIdReducer },
});
