import { useLoaderData } from "react-router-dom";
import classes from "./Shopdetail.module.css"


const Shopdetail = () =>{
    const data = useLoaderData();
    console.log(data)
   
    return (
        <>
        <div className={classes.detail}> 
            <h1>{data.data.name}</h1>
        </div>
        <div className={classes.buttondiv}>
            <button className={classes.detailbutton}> 메뉴 </button>
            <button className={classes.detailbutton}>정보</button>
            <button className={classes.detailbutton}>리뷰</button>

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