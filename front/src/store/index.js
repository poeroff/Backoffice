import {configureStore} from "@reduxjs/toolkit"
import ChoiceReducer from "./Choce-action"


const store = configureStore({
    reducer : { Choice : ChoiceReducer}
})
export default store