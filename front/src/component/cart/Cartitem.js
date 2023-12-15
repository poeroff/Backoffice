import classes from "./Cartitem.module.css"
import { CartActions } from "../../store/Cart-action";
import { useDispatch } from "react-redux";
const Cartitem = (props) => {
    const { title, quantity, total, price ,id } = props.item;
    const dispatch = useDispatch();


    const removeItemHandler = () => {
        dispatch(CartActions.removeItemFromCart(id));
    };

    const addItemHandler = () => {
        dispatch( CartActions.addItemToCart({ id, title,price,}));

    };

    return (
        <li className={classes.item}>
            <header>
                <h3>{title}</h3>
                <div className={classes.price}>
                    <span className={classes.itemprice}>가격 : {price}</span>
                </div>
            </header>
            <div className={classes.details}>
                <div className={classes.quantity}>
                    x <span>{quantity}</span>
                </div>
                <div className={classes.actions}>
                    <button onClick={removeItemHandler}>-</button>
                    <button onClick={addItemHandler}>+</button>
                </div>
            </div>
            총 가격 : {total}
        </li>

    )

}
export default Cartitem