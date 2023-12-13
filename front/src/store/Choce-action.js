import { createSlice } from "@reduxjs/toolkit";



const Choiceslice = createSlice({
    name : "choice",
    initialState :{
        User : "",
    },
    reducers :{
        Bossuser(state){
            state.User = "Boss"

        },
        clientuser(state){
            state.User = "Client"
        },

    }
})

export const ChoicActions = Choiceslice.actions;

export default Choiceslice.reducer