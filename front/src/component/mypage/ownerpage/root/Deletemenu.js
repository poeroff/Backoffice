

import { useEffect, useState } from "react"
import { AiOutlineClose } from "react-icons/ai";
import classes from "../Page.module.css"


const Deletemenu = (props) =>{
    const [menu, setmenu] = useState()
  
     useEffect(()=>{
         fetch(`http://localhost:8000/menus/${props.data}`).then(res => res.json()).then(resData => {
            if(resData.data.length > 0){
                setmenu(resData.data)
         }
        }).catch(err =>{
             console.log(err)
         })

     },[])

     const deletemenu = (value) =>{
     

        
        fetch(`http://localhost:8000/menu/${props.data}/${value}`,{method:"delete",headers:{authorization : "Bearer "+sessionStorage.getItem("accesstoken")}}).then(res=>res.json())
        .then(resData => console.log(resData))
        

     }

    return (
        <div>
            {menu && menu.map(menulist =>(
                <form key = {menulist.id} className={classes.Deletemenu}>
                    <div> 메뉴 이름 : {menulist.name} </div>
                    <AiOutlineClose onClick={() => deletemenu(menulist.id)} style={{cursor:"pointer"}}></AiOutlineClose>
                </form>
            ) 
            )}

        </div>
        
    )




}
export default Deletemenu