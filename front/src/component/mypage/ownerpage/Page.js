import Pagefooter from "./Pagefooter";
import React, { useState, useRef } from "react";
import opensocket from "socket.io-client"
import PageContainer from "./PageContainer";
const Page = (props) =>{
    return(
        <div className="vh-100" style={{ backgroundColor: '#eee', overflowY: "scroll" }} >
            <PageContainer data = {props}></PageContainer>
            <Pagefooter></Pagefooter>
        </div >
       
    )

}
export default Page;
