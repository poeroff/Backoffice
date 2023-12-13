
import { useSelector } from "react-redux";
import Clientmypage from "./Clientmypage";
import Bossmypage from "./Bossmypage";
const Mypage = () =>{

    const user = useSelector(state => state.Choice.User)
    return(
        <div>
               {sessionStorage.getItem("user") === "client" &&  <Clientmypage></Clientmypage>}
               {sessionStorage.getItem("user") ==="boss" && <Bossmypage></Bossmypage>}

        </div>
     

    )

 


}
export default Mypage;