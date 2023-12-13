import { GoogleLogin } from '@react-oauth/google';
import {GoogleOAuthProvider} from "@react-oauth/google";
import classes from "./Google.module.css"


const Google = () =>{
    const clientId = "118443814001-jn6pgsbn26k6eouvrcjihis1aj406osn.apps.googleusercontent.com";
  
    const responseGoogle = (error) => {
        console.log(error);
    }
    return (
        <div  >
        
        <GoogleOAuthProvider clientId={clientId} >
            <GoogleLogin
                onSuccess={(res) => {
                    console.log(res);
                }}
                onFailure={(err) => {
                    console.log(err);
                }}
                
            />
        </GoogleOAuthProvider>
    </div>


    )

}
export default Google