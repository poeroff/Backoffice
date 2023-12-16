import { MDBCol, MDBContainer, MDBRow, MDBFooter,  MDBBtn } from 'mdb-react-ui-kit';
import classes from "./Page.module.css"
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { Link ,useNavigate} from 'react-router-dom';

const Pagefooter = () => {
    const navigate = useNavigate();
    const Logouthandler = (event) => {
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("accesstoken")
        navigate("/")
        window.location.reload();
    }
    return (
        <MDBFooter bgColor='light' className={classes.footer}>
                <MDBContainer className='p-4'>

                    <MDBRow className={classes.row}>
                        <MDBCol>
                            <MDBBtn> <AiOutlineSearch size="25" /> 검색 </MDBBtn>
                        </MDBCol>
                        <MDBCol>
                            <Link to="/"> <AiFillHome size="50" />  </Link>
                        </MDBCol>
                        <MDBCol>
                            <Link to="/" onClick={Logouthandler}> <BiLogOut size="50" /> </Link>

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </MDBFooter>
    )

}
export default Pagefooter;