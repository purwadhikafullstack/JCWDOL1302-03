import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { Auth, User, Login } from '@/interfaces/user.interface';
import parseJWT from '@/utils/parseJWT';
import instance from '@/utils/instances';

const initialState: Auth = {
  user: {
    id: '',
    username: '',
    email: '',
    password: '',
    verified: false,
    referralCode: '',
    name: '',
    gender: '',
    birthDate: '',
    role: '',
    profilePicture: '',
    claimedCode: '',
    longitude: 0,
    latitude: 0,
  },
  status: {
    isLogin: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.status.isLogin = true;
    },
    logoutState: (state: Auth) => {
      state.user = initialState.user;
      state.status = initialState.status;
    },
    tokenValidState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.status.isLogin = true;
    },
    updateProfileState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
    },
    updateAvatarState: (state: Auth, action: PayloadAction<string>) => {
      state.user.profilePicture = action.payload;
    },
  },
});

export const signIn = (params: Login) => async (dispatch: Dispatch) => {
  try {
    const { email, password } = params;
    const location = JSON.parse(localStorage.getItem('location') || '');
    const { data } = await instance.post('/auth/login', {
      email,
      password,
      longitude: location.longitude,
      latitude: location.latitude,
    });
    const user = data?.data.user;

    dispatch(
      loginState({
        id: user?.id,
        email: user?.email,
        password: user?.password,
        name: user?.name,
        profilePicture: user?.profilePicture,
        username: user?.username,
        gender: user?.gender,
        birthDate: user?.birthDate,
        verified: user?.verified,
        role: user?.role,
        referralCode: user?.referralCode,
        claimedCode: user?.claimedCode,
        longitude: user?.longitude,
        latitude: user?.latitude,
      }),
    );

    localStorage.setItem('token', data?.data.token);
    localStorage.setItem('user', JSON.stringify(user));

    alert('Welcome to Cheery Fresh :)');
  } catch (err) {
    console.log(err);
    alert('Email atau Password salah');
  }
};

export const signOut = () => async (dispatch: Dispatch) => {
  try {
    dispatch(logoutState());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (err) {
    console.log(err);
  }
};

export const checkToken = (token: string) => async (dispatch: Dispatch) => {
  try {
    if(!token)throw new Error('Token not found')
    
    const { data } = await instance.get('/auth/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = data.data.user;

    if(!user?.id) throw new Error('User not found')

    dispatch(
      tokenValidState({
        id: user?.id,
        email: user?.email,
        password: user?.password,
        name: user?.name,
        profilePicture: user?.profilePicture,
        username: user?.username,
        gender: user?.gender,
        birthDate: user?.birthDate,
        verified: user?.verified,
        role: user?.role,
        referralCode: user?.referralCode,
        claimedCode: user?.claimedCode,
        longitude: user?.longitude,
        latitude: user?.latitude,
      }),
    );

    localStorage.setItem('token', data?.data.token);
    localStorage.setItem('user', JSON.stringify(user));
    return user
  } catch (err) {
    console.log(err);
  }
};

export const updateProfile =
  (id: string, params: User) => async (dispatch: Dispatch) => {
    try {
      const { data } = await instance.patch(`/users/${id}`, { ...params });

      dispatch(updateProfileState({ ...params }));
      localStorage.setItem('user', JSON.stringify(data?.data));
    } catch (err) {
      console.log(err);
      alert('Update profile failed');
    }
  };

export const updateAvatar =
  (id: string, formData: FormData) => async (dispatch: Dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await instance.patch(
        `/users/${id}/avatar`,
        formData,
        config,
      );
      const image = data?.data.image;

      dispatch(updateAvatarState(image));
      localStorage.setItem('user', JSON.stringify(data?.data));
    } catch (err) {
      console.log(err);
      alert('Update avatar failed');
    }
  };

export const {
  loginState,
  logoutState,
  tokenValidState,
  updateProfileState,
  updateAvatarState,
} = authSlice.actions;

export default authSlice.reducer;
