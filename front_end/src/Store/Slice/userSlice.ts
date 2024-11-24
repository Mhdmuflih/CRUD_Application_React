import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface User {
    _id: string;
    name: string;
    email: string;
}

interface UserAuthState {
    isLoggedIn: boolean;
    user: User | null;
    change: boolean
}

interface LoginPayload {
    token: string;
    isLoggedIn: boolean;
    user : User;
    change?: boolean
}

const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null;
const storedToken = localStorage.getItem('userToken') ? true : false;


const initialState: UserAuthState = {
    isLoggedIn: storedToken,
    user: storedUser,
    change: false
};

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
            localStorage.setItem('userToken', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            state.isLoggedIn = action.payload.isLoggedIn;
            state.user = action.payload.user;
        },
        logout: (state) => {
            localStorage.removeItem('userToken');
            localStorage.removeItem('user');
            state.isLoggedIn = false;
            state.user = null;
        },
        editUserData: (state, action)=> {
            state.user = action.payload.user;
            state.change = true
        }
    }
})


export const { loginSuccess, logout, editUserData } = userAuthSlice.actions;
export default userAuthSlice.reducer