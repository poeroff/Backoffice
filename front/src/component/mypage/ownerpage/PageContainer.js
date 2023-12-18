import { MDBCol, MDBContainer, MDBFile, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBFooter, MDBModalBody, MDBInput, MDBCardBody, MDBBtn, MDBModal, MDBModalDialog, MDBRadio, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalFooter } from 'mdb-react-ui-kit';
import classes from "./Page.module.css"
import { AiOutlinePlus } from "react-icons/ai";
import { AiTwotoneHighlight } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState} from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import Pageaddmodal from './Pageaddmodal';
import Pageupdatemodal from './Pageupdatemodal';
import Choicemodal from './Choicemodal';

const PageContainer = (props) =>{
   
    const [basicModal, setBasicModal] = useState(false);
    const toggleOpen = () => setBasicModal(!basicModal);
    const [updateModal, setupdateModal] = useState(false);
    const updatetoggleOpen = () => setupdateModal(!updateModal);

    const [choiceModal, setchoiceModalModal] = useState(false);
    const choiceModaltoggleOpen = () => setchoiceModalModal(!choiceModal);
    const deleteshophandler = () => {
        const accessToken = sessionStorage.getItem("accesstoken")
        fetch(`http://localhost:8000/restaurants/${props.data.Restaurants[0].cate}/${props.data.Restaurants[0].id}`, { method: "delete", headers: { authorization: 'Bearer ' + accessToken } }).then(res => res.json()).then(resData => console.log(resData)).catch(err => console.log(err))
    }
    const updateshophandler = () => {
        const accessToken = sessionStorage.getItem("accesstoken")
        fetch(`http://localhost:8000/restaurants/${props.data.Restaurants[0].cate}/${props.data.Restaurants[0].id}`, { method: "put", headers: { authorization: 'Bearer ' + accessToken } }).then(res => res.json()).then(resData => console.log(resData)).catch(err => console.log(err))

    }
    return (
        <MDBContainer>
        <MDBRow className="justify-content-center">
            <MDBCol md="9" lg="7" xl="5" className="mt-5">
                <MDBCard style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }}>
                    <MDBCardBody className="p-4 text-black">
                        <div>
                        </div>
                        <div className="d-flex align-items-center mb-4">
                            <div className="flex-shrink-0">
                                <AiOutlineUser size="75" />
                            </div>
                            <div className="flex-grow-1 ms-3">
                                <button className={classes.plus} onClick={toggleOpen}><AiOutlinePlus size="25" /> </button>
                                <div className="d-flex flex-row align-items-center mb-2">
                                    <p className="mb-0 me-2">{props.data.user.nickname} 사장님</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div style={{display:"flex"}}>
                            <AiOutlineDelete size="40" className={classes.delete} onClick={deleteshophandler} style={{ cursor: "pointer" }} />
                            <AiTwotoneHighlight size="40" className={classes.delete} onClick={updatetoggleOpen} style={{ cursor: "pointer" }} />
                        </div>
                        {props.data.Restaurants.length > 0 &&
                            
                                <MDBCard key={props.data.Restaurants[0].id} className={classes.mdbcard} onClick={choiceModaltoggleOpen} style={{cursor:"pointer"}}>
                                    <img src={props.data.Restaurants[0].image} position='top' alt='...' />
                                    <MDBCardBody>
                                        <MDBCardTitle style={{ textAlign: "center" }}>{props.data.Restaurants[0].name}</MDBCardTitle>
                                    </MDBCardBody>
                                </MDBCard>
                          
                        }
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
        {basicModal && <Pageaddmodal valid = {toggleOpen}></Pageaddmodal>}
        {updateModal && <Pageupdatemodal valid ={updatetoggleOpen} data={props}></Pageupdatemodal>}
        {choiceModal && <Choicemodal valid ={choiceModaltoggleOpen} data ={props}></Choicemodal>}
    </MDBContainer>
    )

}
export default PageContainer