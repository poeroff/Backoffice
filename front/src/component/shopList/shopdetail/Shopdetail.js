import { useLoaderData } from "react-router-dom";
import classes from "./Shopdetail.module.css"
import { useState } from "react";
import Menu from "./Menu";
import Info from "./Info";
import Review from "./Review";


const Shopdetail = () =>{
    const data = useLoaderData();
    const [Menus, setMenu] = useState(true);
    const [Infos , setInfo] = useState(false);
    const [Reviews, setReview] = useState(false);

   const Menuclick = () =>{
    setMenu(true);
    setInfo(false)
    setReview(false)

   }
   const Infoclick = () =>{
    setMenu(false);
    setInfo(true)
    setReview(false)
    
   }
   const Reviewclick = () =>{
    setMenu(false);
    setInfo(false)
    setReview(true)
    
   }
   
    return (
        <>
        <div className={classes.detail}> 
            <h1>{data.data.name}</h1>
        </div>
        <div className={classes.buttondiv}>
            <button className={classes.detailbutton} onClick={Menuclick}> 메뉴 </button>
            <button className={classes.detailbutton} onClick={Infoclick}> 정보</button>
            <button className={classes.detailbutton} onClick={Reviewclick}> 리뷰</button>
        </div>
        <div className={classes.Info}>
            {Menus && <Menu></Menu>}
            {Infos && <Info></Info>}
            {Reviews && <Review></Review>}

        </div>
        </>
    )


}
export default Shopdetail;


export async function loader({params}){
    try {

        const shopcate = params.foodMenu
        const shopdetail = params.shopid
    
        const response = await fetch(`http://localhost:8000/restaurants/${shopcate}/${shopdetail}`)
      

        const resData = await response.json();
        return resData


    }
    catch(err){
        return err;
    }
}