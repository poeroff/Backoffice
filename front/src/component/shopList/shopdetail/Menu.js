import classes from "./Menu.module.css"
import { useRef } from "react"
import Menuform from "./Menuform"
import { AiFillPlusSquare } from "react-icons/ai";

const Menu = (props) => {


    return (
        <div>
            {props.data.length > 0 && props.data.map(menulist => (
                <li key = {menulist.id}className={classes.meal}>
                    <div>
                        <h3>{menulist.name}</h3>

                        <div className={classes.price}>price : {menulist.price}</div>
                    </div>
                    <div>
                        <Menuform key = {menulist.id} data={menulist}></Menuform>
                    </div>
                </li>

            ))}




        </div>

    )
}
export default Menu