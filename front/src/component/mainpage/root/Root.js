
import { Outlet } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Choiceuser from "../../choice/Choice"
import classes from "./Root.module.css"
import { useSelector } from "react-redux"
import Login from "../../auth/Login"
import Home from "../Homepage/Home"




const Root = () => {
    return (
        <React.Fragment>
            
             {!sessionStorage.getItem("accesstoken") && <Choiceuser></Choiceuser>  }
             {sessionStorage.getItem("accesstoken") && <Home></Home> }
            <main>
                <Outlet></Outlet>
            </main>
        </React.Fragment>
    )

}
export default Root