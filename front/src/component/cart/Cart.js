import { useSelector } from "react-redux";
import Cartitem from "./Cartitem"
import Card from "../ui/Card";
import classes from "./Cart.module.css"
import { useState ,useEffect} from "react";

let totla = 0;
const Cart = () => {
    const [total, setTotal] = useState(0);
    const cartItems = useSelector(state => state.Cart.items);
    useEffect(() => {
      let newTotal = 0;
      cartItems.forEach((menu) => {
        newTotal += menu.totalPrice;
      });
      setTotal(newTotal);
    }, [cartItems]);
 

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
          )) }
          <div style={{width:"100%", textAlign:"right"}}>총 가격 : {total}</div>
        </ul>
       
       
      </Card>
    )

}
export default Cart