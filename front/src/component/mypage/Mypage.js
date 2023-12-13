
import { useSelector } from "react-redux";
import Clientmypage from "./Clientmypage";
import Bossmypage from "./Bossmypage";
const Mypage = () =>{

    const user = useSelector(state => state.Choice.User)
    return(
        <div>
               {sessionStorage.getItem("user") === "OWNER" &&  <Clientmypage></Clientmypage>}
               {sessionStorage.getItem("user") ==="USER" && <Bossmypage></Bossmypage>}

        </div>
     

    )

 


}
export default Mypage;