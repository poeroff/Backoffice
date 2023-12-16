import { useLoaderData } from "react-router-dom";
import classes from "./Shop.module.css"
import { MDBListGroup, MDBListGroupItem, MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead, } from 'mdb-react-ui-kit';
import { Link, useParams ,useNavigate } from "react-router-dom";


const Shop = () => {
    const data = useLoaderData();
    console.log(data)
   
    const params = useParams();
    
    const navigate  = useNavigate();

    const moveurlhandler = (e) =>{
       navigate(`${e}`)
    }


    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="d-flex justify-content-center align-items-center">
                    <MDBCol lg="9" xl="7">
                        <MDBCard className="rounded-3">
                            <MDBCardBody className="p-4">
                                <h4 className="text-center my-3 pb-3">{params.foodMenu} shop list</h4>

                                <MDBTable className="mb-4">
                                    <MDBTableHead>
                                        <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">shop name</th>
                                            <th scope="col">description</th>
                                            <th scope="col">Status</th>
                                            

                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {data && data.data.map(list => (
                                           
                                            
                                            <tr key ={list.id} onClick={() => moveurlhandler(list.id)} style={{cursor:"pointer"}}>
                                                <th scope="row"><img src={list.image} style={{width:"100px" , height:"100px", borderRadius:"10rem"}}></img></th>
                                                <td >{list.name}</td>
                                                <td>{list.description}</td>
                                                <td>영업중</td>

                                            </tr>
                                           
                                        ))}
                                      
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>



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