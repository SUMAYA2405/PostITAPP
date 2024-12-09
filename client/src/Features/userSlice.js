import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserData } from "../ExampleData";

const initialState = {
  value: UserData,
  user: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};


export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/registerUser", userData);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const login = createAsyncThunk("users/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:3001/login", userData);
    return response.data.user;
  } catch (error) {
    return rejectWithValue("Invalid credentials");
  }
});

export const logout = createAsyncThunk("users/logout", async (_, { rejectWithValue }) => {
  try {
    await axios.post("http://localhost:3001/logout");
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Logout failed");
  }
});

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/updateUserProfile/${userData.email}`,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Profile update failed");
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.isLoading = false;
        state.isSuccess = false;
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default userSlice.reducer;
