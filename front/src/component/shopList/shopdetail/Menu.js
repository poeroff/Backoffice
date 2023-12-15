import classes from "./Menu.module.css"
import { useRef } from "react"
import Menuform from "./Menuform"
import { AiFillPlusSquare } from "react-icons/ai";

const Menu = () => {
    
    return (
            <div>
                   <li className={classes.meal}>
                <div>
                    <h3>sadas</h3>

                    <div className={classes.price}>3</div>
                </div>
                <div>
                    <Menuform></Menuform>
                </div>
            </li>   
          

            </div>
         
    )
}
export default Menu