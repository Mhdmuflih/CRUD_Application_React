import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoggedIn: localStorage.getItem("adminToken") ? true : false,
}

const adminSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers : {
        loginSuccess: (state , action) => {
            localStorage.setItem("adminToken", action.payload.token);
            state.isLoggedIn = true;
        },
        logout: (state) => {
            localStorage.removeItem("adminToken");
            state.isLoggedIn = false
        }
    }
})

export const {loginSuccess , logout} = adminSlice.actions;

export default adminSlice.reducer;