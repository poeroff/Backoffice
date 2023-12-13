import React from "react"
import classes from "./Choice.module.css";

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { useDispatch} from "react-redux";
import { ChoicActions } from "../../store/Choce-action";
import { useNavigate } from "react-router-dom";




const Choiceuser = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
   

    
    const Choicehandler = (value) => {
        if(value ==="boss"){
            dispatch(ChoicActions.Bossuser())
        }
        else if(value ==="client"){
            dispatch(ChoicActions.clientuser());
        }
        navigate("/Login")
    }
    return (
        <form className={classes.form} >
            <div className={classes.div} onClick={()=>Choicehandler("boss")}>
                <input type="hidden" value="Boss" ></input>
                <button className={classes.button} >
                    <MDBCard className={classes.card}>
                        <MDBCardImage src='https://cdn-icons-png.flaticon.com/512/755/755126.png' position='top' alt='...' />
                        <MDBCardBody className={classes.textbody}>

                            <MDBCardText className={classes.text}>
                                사장님이신가요?
                            </MDBCardText>

                        </MDBCardBody>
                    </MDBCard>

                </button>

            </div>
           
            <div className={classes.div} onClick={()=>Choicehandler("client")}>
                <input type="hidden" value="client"></input>
                <button className={classes.button} >
                    <MDBCard className={classes.card}>
                        <MDBCardImage src='https://cdn-icons-png.flaticon.com/512/755/755126.png' position='top' alt='...' />
                        <MDBCardBody className={classes.textbody}>

                            <MDBCardText className={classes.text}>
                                고객님이신가요?
                            </MDBCardText>

                        </MDBCardBody>
                    </MDBCard>
                </button >
            </div>


        </form>

    )

}
export default Choiceuser