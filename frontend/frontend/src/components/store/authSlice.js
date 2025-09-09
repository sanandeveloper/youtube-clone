import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const createUser = createAsyncThunk(
  "create",
  async (data, { rejectWithValue }) => {
    try {

      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("username", data.username);
      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }
      formData.append("coverImage",data.coverImage || "")
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData,
        
      );
      console.log("respone ",response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



const initialState = {
  user: [],
  loading: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(createUser.pending,(state)=>{
      state.loading=true

    })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.push( action.payload)
        console.log("action.payload",action.payload)
      })
      .addCase(createUser.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});


export default authSlice.reducer


