import classes from "./Clientmypage.module.css"
import { AiOutlineUser } from "react-icons/ai";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { AiOutlineSolution } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsChatLeftText } from "react-icons/bs";


const Clientmypage = (props) => {
    return (
        <div className="vh-100" style={{ backgroundColor: '#eee' }}>
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
                                        <div className="d-flex flex-row align-items-center mb-2">
                                            <p className="mb-0 me-2">{props.user.nickname}</p>
                                            

                                        </div>
                                        <div>
                                            <MDBBtn outline color="dark" rounded size="sm">Point .   {props.user.money}</MDBBtn>
                                            
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className={classes.mypagebtn}>
                                <AiOutlineSolution size="60" className={classes.icon}/> 
                                <AiOutlineShoppingCart  size="60"className={classes.icon}/>
                                <BsChatLeftText  size="55" className={classes.icon}/>

                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )

}
export default Clientmypage;