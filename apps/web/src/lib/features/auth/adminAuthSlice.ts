import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { Admin, AuthAdmin, Login } from '@/interfaces/auth.admin.interface';
import instance from '@/utils/instances';

const initialState: AuthAdmin = {
  admin: {
    id: 0,
    username: '',
    email: '',
    password: '',
    role_id: 0,
  },
  status: {
    isLogin: false,
  },
};

export const authAdminSlice = createSlice({
  name: 'authAdmin',
  initialState,
  reducers: {
    loginAdminState: (state: AuthAdmin, action: PayloadAction<Admin>) => {
      const admin = action.payload;
      state.admin = admin;
      state.status.isLogin = true;
    },
    logoutAdminState: (state: AuthAdmin) => {
      state.admin = initialState.admin;
      state.status = initialState.status;
    },
    tokenValidState: (state: AuthAdmin, action: PayloadAction<Admin>) => {
      const admin = action.payload;
      state.admin = admin;
      state.status.isLogin = true;
    },
  },
});

export const loginAdmin = (params: Login) => async (dispatch: Dispatch) => {
  try {
    const { email, password } = params;
    const { data } = await instance.post(`/auth/admin/login`, {
      email,
      password,
    });

    const admin = data.data.admin;

    dispatch(
      loginAdminState({
        id: admin.id,
        username: admin.username,
        email: admin.email,
        password: admin.password,
        role_id: admin.role_id,
      }),
    );

    localStorage.setItem('token', data.data.token);
    localStorage.setItem('admin', JSON.stringify(admin));
    alert(
      `Welcome ${admin.username}, You logged in as ${admin.role_id === 1 ? 'Super Admin' : 'Store Admin'}`,
    );
  } catch (e) {
    alert('Email atau password salah!');
    throw e;
  }
};

export const logoutAdmin = () => async (dispatch: Dispatch) => {
  try {
    dispatch(logoutAdminState());
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  } catch (err) {
    console.log(err);
  }
};

export const checkAdminToken = (token: string) => async (dispatch: Dispatch) => {
  try {
    if (!token) throw new Error('Token not found');

    const { data } = await instance.get('/auth/admin', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const admin = data.data.admin;

    if (!admin?.id) throw new Error('Admin not found');

    dispatch(
      tokenValidState({
        id: admin.id,
        username: admin.username,
        email: admin.email,
        password: admin.password,
        role_id: admin.role_id,
      }),
    );

    localStorage.setItem('token', data?.data.token);
    localStorage.setItem('admin', JSON.stringify(admin));

    return admin;
  } catch (err) {
    console.error(err);
    return false;
  }
};



export const { loginAdminState, logoutAdminState, tokenValidState } = authAdminSlice.actions;

export default authAdminSlice.reducer;
