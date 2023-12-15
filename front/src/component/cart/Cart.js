import { useSelector } from "react-redux";
import Cartitem from "./Cartitem"
import Card from "../ui/Card";
import classes from "./Cart.module.css"

const Cart = () => {
    const cartItems = useSelector(state => state.Cart.items);

    return (
        <Card className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <Cartitem
              key={item.id}
              item={{
                id: item.id,
                title: item.name,
                quantity: item.quantity,
                total: item.totalPrice,
                price: item.price,
              }}
            />
          ))}
        </ul>
       
      </Card>
    )

}
export default Cart