import { useRef ,useState} from "react";
import classes from "./Menuform.module.css"
import Input from "../../ui/Input";
import { useDispatch } from "react-redux";
import { CartActions } from "../../../store/Cart-action";

const Menuform = (props) =>{
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();
    const dispatch = useDispatch();
    const { title, price, description, id } = props;

  
    const submitHandler = (event) => {
      event.preventDefault();
    
      dispatch(CartActions.addItemToCart({ id : 3,title : "asdas", price : 3 }));

    };
    return (
        <form className={classes.form} onSubmit={submitHandler}>
        
        <button type="submit">+ Add</button>
       
      </form>
    )

}
export default Menuform