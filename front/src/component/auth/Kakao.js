import KakaoLogin from "react-kakao-login";
import { useNavigate } from "react-router"


const Kakao = () =>{
    const Navigate = useNavigate();
    const kakaoClientId = 'df1a372c4db88f5edd06ef93ae70d5cc'
    const kakaoOnSuccess = async (data)=>{
        let accesstoken = data.response.id_token;
        console.log(accesstoken)
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