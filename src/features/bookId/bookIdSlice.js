import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apiService";

const initialState = {
  book: {},
  status: "idle",
  errorMessage: "",
};

export const getBookById = createAsyncThunk(
  "book/getBookById",
  async ({ bookId }, thunkApi) => {
    const res = await api.get(`/books/${bookId}`);
    return res.data;
  }
);

// export const addBookById = createAsyncThunk(
//   "book/addBookById",
//   async ({ book }, thunkApi) => {
//     const res = await api.post(`/favorites`);
//     return res.data;
//   }
// );

const bookIdSlice = createSlice({
  name: "book",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.status = "idle";
        state.book = action.payload;
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.status = "fail";
        state.errorMessage = action.error.message;
      });
  },
});

export default bookIdSlice.reducer;
