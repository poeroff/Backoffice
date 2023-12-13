
import { useSelector } from "react-redux";
import Clientmypage from "./Clientmypage";
import Bossmypage from "./Bossmypage";
const Mypage = () =>{

    const user = useSelector(state => state.Choice.User)
    return(
        <div>
               {sessionStorage.getItem("user") === "USER" &&  <Clientmypage></Clientmypage>}
               {sessionStorage.getItem("user") ==="OWNER" && <Bossmypage></Bossmypage>}

        </div>
     

    )

 


}
export default Mypage;