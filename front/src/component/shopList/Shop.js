import { useLoaderData } from "react-router-dom";
import classes from "./Shop.module.css"
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";


const Shop = () => {
    const data = useLoaderData();
    console.log(data)

    return (
        <div>
            {data && data.data.map(shoplist => (

                    <Link to ={`${shoplist.id}`}>
                    <MDBListGroup key={shoplist.id} className={classes.shop} light>
                        <MDBListGroupItem tag='button' type='button' className={classes.sh} >
                            <div className={classes.shoplist} >
                                <img className={classes.shoplistimg} src="https://th.bing.com/th/id/OIP.NXw7ig_Lgc_50cI_gd2YhQHaEK?w=287&h=180&c=7&r=0&o=5&pid=1.7"></img>
                                <h3>{shoplist.name}</h3>
                            </div>
                        </MDBListGroupItem>
                    </MDBListGroup>
                    </Link>
             

            ))}

        </div>



    )

}
export default Shop;


export async function loader({ params }) {
    try {
        const id = params.foodMenu;
        const response = await fetch("http://localhost:8000/restaurants/" + id);

        const resData = await response.json();
        return resData;
    }
    catch (err) {
        return err;
    }





}