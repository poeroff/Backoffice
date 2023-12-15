import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import classes from "./Review.module.css"
import { AiOutlineStar } from "react-icons/ai";
import { useState ,useRef} from 'react';
import { AiFillStar } from "react-icons/ai";
import { useParams } from 'react-router-dom';

const Review = () => {
    const [onestars, setonestars] = useState(false);
    const [twostars, settwostars] = useState(false);
    const [threestars, setthreestars] = useState(false);
    const [fourstars, setfourstars] = useState(false);
    const [fivestars, setfivestars] = useState(false);
    const {shopid} = useParams()
    const [score , setscore] = useState();
    const reviewinput = useRef();

    const onestar = () => {
        setonestars(true)
        settwostars(false)
        setthreestars(false)
        setfourstars(false)
        setfivestars(false)
        setscore(1)

    }
    const twostar = () => {
        setonestars(true)
        settwostars(true)
        setthreestars(false)
        setfourstars(false)
        setfivestars(false)
        setscore(2)
        

    }
    const threestar = () => {
        setonestars(true)
        settwostars(true)
        setthreestars(true)
        setfourstars(false)
        setfivestars(false)
        setscore(3)

    }
    const fourstar = () => {
        setonestars(true)
        settwostars(true)
        setthreestars(true)
        setfourstars(true)
        setfivestars(false)
        setscore(4)

    }
    const fivestar = () => {
        setonestars(true)
        settwostars(true)
        setthreestars(true)
        setfourstars(true)
        setfivestars(true)
        setscore(5)

    }
    const submithandler = (event) => {
        event.preventDefault();
      
        fetch(`http://localhost:8000/restaurants/${shopid}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("accesstoken")
            },
            body: JSON.stringify({ review: reviewinput.current.value, score: score })
        })
        .then(res => res.json())
        .then(resData => console.log(resData))
        .catch(err => {
            console.error("Error during fetch:", err);
          
        });
    }

    return (
        <div>
            <div className={classes.star}>
                <button onClick={onestar}> {onestars ?  <AiFillStar size="50" /> : <AiOutlineStar size="50" />}</button>
                <button onClick={twostar}>{twostars ?  <AiFillStar size="50" /> : <AiOutlineStar size="50" />}</button>
                <button onClick={threestar}>{threestars ?  <AiFillStar size="50" /> : <AiOutlineStar size="50" />}</button>
                <button onClick={fourstar}>{fourstars ?  <AiFillStar size="50" /> : <AiOutlineStar size="50" />}</button>
                <button onClick={fivestar}>{fivestars ?  <AiFillStar size="50" /> : <AiOutlineStar size="50" />}</button>
            </div>
            <form className={classes.form} onSubmit={submithandler}>
                <input className={classes.text} label='Text input' id='typeText' type='text'  ref ={reviewinput}/>
                <MDBBtn className={classes.btn} type="submit">submit</MDBBtn>
            </form>

        </div>


    )

}
export default Review