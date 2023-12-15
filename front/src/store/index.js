import {configureStore} from "@reduxjs/toolkit"
import ChoiceReducer from "./Choce-action"
import Cartaction from "./Cart-action"



const store = configureStore({
    reducer : { Cart : Cartaction}
})
export default store