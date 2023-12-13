import { createSlice } from "@reduxjs/toolkit";



const Choiceslice = createSlice({
    name : "choice",
    initialState :{
        User : "",
    },
    reducers :{
        Bossuser(state){
            state.User = "USER"

        },
        clientuser(state){
            state.User = "OWNER"
        },

    }
})

export const ChoicActions = Choiceslice.actions;

export default Choiceslice.reducer