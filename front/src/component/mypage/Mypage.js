
import { useSelector } from "react-redux";
import Clientmypage from "./Clientmypage";
import Bossmypage from "./Bossmypage";
import { useLoaderData } from "react-router-dom";
const Mypage = () =>{
    const data = useLoaderData();


   
    return(
        <div>
               {sessionStorage.getItem("user") === "USER" &&  <Clientmypage user = {data.user}></Clientmypage>}
               {sessionStorage.getItem("user") ==="OWNER" && <Bossmypage user = {data.user} Restaurants  = {data.Restaurants}></Bossmypage>}

        </div>
     

    )

 


}
export default Mypage;


export async function loader(){
    try{
        const response = await fetch("http://localhost:8000/user",{method : "GET", headers : {authorization : "Bearer "+sessionStorage.getItem("accesstoken")}})

        const resDate = await response.json();
        return resDate;
      
    }catch(err){
        return err
    }

}