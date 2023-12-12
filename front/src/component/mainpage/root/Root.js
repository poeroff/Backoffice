
import { Outlet } from "react-router-dom"
import React, { useState } from "react"
import Choiceuser from "../../choice/Choice"
import classes from "./Root.module.css"
import { useSelector } from "react-redux"
import Login from "../../auth/Login"
import Home from "../Homepage/Home"




const Root = () => {
 
  
    const user = useSelector(state => state.Choice.User)

 
   

    return (
        <React.Fragment>
            
             {!user && <Choiceuser></Choiceuser>  }
             {user && <Home></Home> }
            <main>
                <Outlet></Outlet>
            </main>
        </React.Fragment>
    )

}
export default Root