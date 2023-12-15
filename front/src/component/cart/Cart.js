import { useSelector } from "react-redux";
import Cartitem from "./Cartitem"
import Card from "../ui/Card";
import classes from "./Cart.module.css"

const Cart = () => {
    const cartItems = useSelector(state => state.Cart.items);

    return (
        <Card className={classes.cart}>
        {cartItems < 1   && <h4> 장바구니에 담긴 내역이 없습니다</h4>}
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