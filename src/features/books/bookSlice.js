import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../apiService";

const initialState = {
  books: [],
  status: "idle",
  errorMessage: "",
  loading: false,
  book: {},
};

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async ({ pageNum, limit, query }, thunkApi) => {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const res = await api.get(url);
    return res.data;
  }
);

export const getSingleBook = createAsyncThunk(
  "books/getSingleBook",
  async ({ bookId }) => {
    const res = await api.get(`/books/${bookId}`);
    return res.data;
  }
);

export const addFavorite = createAsyncThunk(
  "books/addFavorite",
  async ({ addingBook }) => {
    await api.post(`/favorites`, addingBook);
    toast.success("The book has been added to the reading list!");
  }
);

export const getFavorite = createAsyncThunk(
  "books/getFavorite",
  async ({ removedBookId }) => {
    if (removedBookId) return;
    const res = await api.get(`/favorites`);
    return res.data;
  }
);

export const deleteFavorite = createAsyncThunk(
  "books/deleteFavorite",
  async ({ removedBookId }, thunkApi) => {
    if (!removedBookId) return;
    await api.delete(`/favorites/${removedBookId}`);
    toast.success("The book has been removed");
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state, action) => {
        //action = {type:"books/getBooks/pending, payload: [{tile:..}]}
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        //action = {type:"books/getBooks/fulfilled", payload: [{tile:..}]}
        state.status = "idle";
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        //action = {type:"books/getBooks/rejected", payload: {error:{message:"fail"}}}
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });
    builder
      .addCase(getSingleBook.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getSingleBook.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(getSingleBook.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });
    builder
      .addCase(addFavorite.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });
    builder
      .addCase(getFavorite.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getFavorite.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(getFavorite.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });
    builder
      .addCase(deleteFavorite.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(deleteFavorite.fulfilled, (state) => {
        state.status = "idle";
        state.loading = false;
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.status = "fail";
        state.loading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export default bookSlice.reducer;
