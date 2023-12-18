import { useRef ,useState} from "react";
import classes from "./Menuform.module.css"
import Input from "../../ui/Input";
import { useDispatch } from "react-redux";
import { CartActions } from "../../../store/Cart-action";

const Menuform = (props) =>{
    

    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();
    const dispatch = useDispatch();
    const { title, price, description, id } = props.data;
   

  
    const submitHandler = (event) => {
      event.preventDefault();
      console.log(props.data)
      dispatch(CartActions.addItemToCart({ id :props.data.id, title : props.data.name , price : +props.data.price }));

    };
    return (
        <form className={classes.form} onSubmit={submitHandler}>
     

        
        <button type="submit">+ Add</button>
       
      </form>
    )

}
export default Menuform