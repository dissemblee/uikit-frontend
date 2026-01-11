import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginDto, RegisterDto, RegisterResponseDto } from "./auth.dto";
import { login, register, logout } from "./auth.api";

interface AuthState {
  user: RegisterResponseDto | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const fetchRegistration = createAsyncThunk<RegisterResponseDto, RegisterDto, { rejectValue: string }>(
  'auth/registration',
  async (data: RegisterDto, { rejectWithValue }) => {
    try {
      const response = await register(data);
      return response.data; 
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка при регистрации');
    }
  }
);

export const fetchLogin = createAsyncThunk<void, LoginDto, { rejectValue: string }>(
  'auth/login',
  async (data: LoginDto, { rejectWithValue }) => {
    try {
      const response = await login(data);
      return response.data; 
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка при входе');
    }
  }
);

export const fetchLogout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => { 
    try {
      await logout();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка при выходе');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
    
    logoutLocal(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      .addCase(fetchRegistration.fulfilled, (state, action: PayloadAction<RegisterResponseDto>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при регистрации';
        state.isAuthenticated = false;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при входе';
        state.isAuthenticated = false;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при выходе';
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearAuth, logoutLocal, clearError } = authSlice.actions;
export default authSlice.reducer;
