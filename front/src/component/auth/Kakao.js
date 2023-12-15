import { useState } from "react";
import KakaoLogin from "react-kakao-login";
import { useNavigate} from "react-router"
import { useSelector } from "react-redux";



const Kakao = () =>{
    const Navigate = useNavigate();
    const [kakaouser , setKakaouser] = useState([])
    const kakaoClientId = process.env.REACT_APP_kakaoClientId;
    let session = window.sessionStorage
    const ownerYn = useSelector(state => state.Choice.User)

   
    const kakaoOnSuccess = async (data)=>{
        let accesstoken = data.response.access_token
        session.setItem("accesstoken" ,accesstoken)
        await fetch("https://kapi.kakao.com/v2/user/me",{
            method:"GET", 
            headers :{"Authorization": `Bearer ${accesstoken}` , "Content-type": "application/x-www-form-urlencoded;charset=utf-8"}})
            .then(res => res.json()).
            then(resData => {console.log(resData.id , resData.kakao_account.profile.nickname)})
            .catch(err => console.log(err))
        

            //await fetch("",{method : "POST" , headers :{  "Content-type": "application"} , body :{nickname : resData.kakao_account.profile.nickname , Logininfo : "Kakao" , ownerYn:ownerYn}})
       
        Navigate("/")
    }


   
    const kakaoOnFailure = (error) => {
        console.log(error);
    };
    return (
        <KakaoLogin
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
    />
    )

}
export default Kakao