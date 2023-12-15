import { createSlice } from "@reduxjs/toolkit";

const loginslice = createSlice({
    name : "login",
    initialState : {
        login : ""
    },
    reducers : {
        Login(state) {
            state.login = sessionStorage.getItem("loginId");

        },
        Logout(state){

        },
    }
})


export const loginaction = loginslice.actions;

export default loginslice.reducer
