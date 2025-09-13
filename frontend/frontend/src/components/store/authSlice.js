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
      if (data.coverImage) {
         formData.append("coverImage",data.coverImage || "")
      }
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData,
        
      );
      console.log("cover image data ...>",data.coverImage)
      console.log("respone ",response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const loginUser= createAsyncThunk('loginuser',async(data,{rejectWithValue})=>{
  

  try {

    const response= await axios.post("http://localhost:8000/api/v1/users/login",data)
    console.log("response data",response.data)
    
     if (response.data.data?.accessToken) {
       localStorage.setItem('accessToken',response.data.data?.accessToken)
     }

     if (response.data.data?.refreshToken) {
       localStorage.setItem('refreshToken',response.data.data?.refreshToken)
     }
     return response.data
    
  } catch (error) {
    return rejectWithValue(error)
  }



 })


export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {},
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return true; // ✅ Used in reducer
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);





const initialState = {
  user: null,
  loading: false,
  error: null,
  status:false
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
      })
      .addCase(createUser.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(loginUser.pending,(state)=>{
        state.status=false
        state.loading=true
      })
      .addCase(loginUser.fulfilled,(state,action)=>{
       state.loading=false
       state.status=true
       state.user=action.payload.data?.user

       console.log("state.user",action.payload)

      })
  },
});


export default authSlice.reducer


