import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// register user
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, ThunkApi) => {
    const url = "/users";
    try {
      const res = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (data.error) {
        return ThunkApi.rejectWithValue(data.error);
      } else {
        console.log(data);
        return data;
      }
    } catch (error) {
      let message = "";
      return (message = ThunkApi.rejectWithValue(error.message));
    }
  }
);

// login user
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, ThunkApi) => {
    const url = "/users/login";

    try {
      const res = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (data.error) {
        return ThunkApi.rejectWithValue(data.error);
      } else {
        // set credentials

        // set credentials
        localStorage.setItem("user", JSON.stringify(data));
        return data;
      }
    } catch (error) {
      return ThunkApi.rejectWithValue(error.message);
    }
  }
);

// logout user
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, ThunkApi) => {
    const url = "/users/logout";

    try {
      const res = await fetch(url, {
        method: "post",
      });

      const data = await res.json();

      if (data.error) {
        return ThunkApi.rejectWithValue(data.error);
      } else {
        console.log("logout", data);
        localStorage.removeItem("user");
        return data;
      }
    } catch (error) {
      return ThunkApi.rejectWithValue(error.message);
    }
  }
);

// initial state
const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isError = false;
        state.mesage = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isError = false;
        state.message = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
