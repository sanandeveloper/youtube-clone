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
      console.log("data password", data.password);
      formData.append("username", data.username);
      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }
      if (data.coverImage) {
        formData.append("coverImage", data.coverImage || "");
      }
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("cover image data ...>", data.coverImage);
      console.log("respone ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginuser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        data
      );

      console.log("response data", response.data);

      if (response.data.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.data?.accessToken);
      }

      if (response.data.data?.refreshToken) {
        localStorage.setItem("refreshToken", response.data.data?.refreshToken);
      }

      return response.data;
    } catch (error) {
      // ✅ return only plain JSON
      return rejectWithValue({
        message: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
      });
    }
  }
);

export const logoutUser = createAsyncThunk("logout", async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.post(
      "http://localhost:8000/api/v1/users/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // if using httpOnly cookies
      }
    );

    if (response) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }

    return true;
  } catch (error) {
    console.log("Logout error:", error.response?.data || error.message);
    throw error;
  }
});

export const changeAvatar = createAsyncThunk(
  "auth/changeAvatar",
  async (file, { rejectWithValue }) => {
    try {
      console.log("file", file);
      const token = localStorage.getItem("accessToken");

      const formData = new FormData();

      formData.append("avatar", file);

      const response = await axios.patch(
        "http://localhost:8000/api/v1/users/change-avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // ✅ include token
          },
        }
      );

      console.log("response.data", response.data);

      return response.data;
    } catch (error) {
      console.log("errorAvatarChange", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeAvatar = createAsyncThunk(
  "remove-Avatat",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.patch(
        "http://localhost:8000/api/v1/users/remove-avatar",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response.data", response.data);

      return {
        statusCode: response.data.statusCode,
        message: response.data.message,
        user: response.data.data, 
      };
    } catch (error) {
      return rejectWithValue;
      console.log("avatar not removed", error);
    }
  }
);

export const coverImageUpdate = createAsyncThunk(
  "update-coverImage",
  async (file, { rejectWithValue }) => {
    try {
     
      console.log("file",file)
       const formData= new FormData()
       const token= localStorage.getItem("accessToken")

       formData.append("coverImage",file)

       const respone= await axios.patch("http://localhost:8000/api/v1/users/change-coverimage",formData
        ,{
          headers:{
            Authorization: `Bearer ${token} `,
            "Content-Type": "multipart/form-data", 

          }
        }
       )
       console.log("response.data",respone.data)
       console.log("res",respone.data.data?.coverImage)

       return respone.data.data?.coverImage



    } catch (error) {
      console.log("coverimage not chnaged", error);
      return rejectWithValue(error.resposne.data)
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  status: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.status = false;
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.user = action.payload.data?.user;

        console.log("state.user", action.payload);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        (state.user = null), (state.status = false);
        state.loading = false;

        console.log("user", state.user);
        console.log("status", state.status);
        console.log("loading", state.loading);
      })
      .addCase(changeAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        console.log("actioncnage.payload", action.payload.data);
      })
      .addCase(removeAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeAvatar.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.avatar = null;
        }
        console.log("userremove", state.user);
      })
      .addCase(coverImageUpdate.pending,(state)=>{

       state.loading=true

      })
      .addCase(coverImageUpdate.fulfilled, (state, action) => {
  state.loading = false;
  state.user.coverImage = action.payload
  console.log("Updated user after cover change:", state.user);
})
  },
});

export default authSlice.reducer;
