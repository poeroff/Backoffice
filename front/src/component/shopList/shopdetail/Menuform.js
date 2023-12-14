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
      console.log(amountInputRef.current.value)
  
      const enteredAmount = amountInputRef.current.value;
      const enteredAmountNumber = +enteredAmount;
      if (enteredAmount.trim().length === 0 ||enteredAmountNumber < 1 ||enteredAmountNumber > 5) {
        setAmountIsValid(false);
        return;
      }
      dispatch(CartActions.addItemToCart({ id : 3,title : "asdas", price : 3 }));

    };
    return (
        <form className={classes.form} onSubmit={submitHandler}>
        <Input
          ref={amountInputRef}
          label='Amount'
          input={{
            id: 'amount',
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1',
          }}
        />
        <button type="submit">+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
      </form>
    )

}
export default Menuform