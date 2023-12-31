import { useLoaderData, Link ,useParams} from "react-router-dom";
import classes from "./Shopdetail.module.css"
import { useState , useRef} from "react";
import Menu from "./Menu";
import Info from "./Info";
import Review from "./Review";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBModalBody, MDBInput,MDBFile,  MDBBtn, MDBModal, MDBModalDialog, MDBRadio, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalFooter } from 'mdb-react-ui-kit';
import { AiFillHome } from "react-icons/ai";
import { AiOutlineFileSearch } from "react-icons/ai";

import Cart from "../../cart/Cart"




const Shopdetail = () => {
    const data = useLoaderData(); console.log(data.data.selectRestaurant)
   
    
    const {shopid} = useParams();
  
    const [Menus, setMenu] = useState(true);
    const [Infos, setInfo] = useState(false);
    const [Reviews, setReview] = useState(false);
    const [scrollableModal, setScrollableModal] = useState(false);
    const [basicModal, setBasicModal] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [image, setImage] = useState(null);
    const addname = useRef();
    const addprice = useRef();
    const adddescription = useRef()

    const onUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        setImage(file)
        console.log(file)
        reader.readAsDataURL(file);

        return new Promise((resolve) => {
            reader.onload = () => {
                setImageSrc(reader.result || null); // 파일의 컨텐츠
                resolve();
            };
        });
    }

    const Menuclick = () => {
        setMenu(true);
        setInfo(false)
        setReview(false)

    }
    const Infoclick = () => {
        setMenu(false);
        setInfo(true)
        setReview(false)

    }
    const Reviewclick = () => {
        setMenu(false);
        setInfo(false)
        setReview(true)

    }
   

    return (
        <>
            <div className={classes.detail}>
                <img src= {data.data.selectRestaurant.image}></img>
                <h3>{data.data.selectRestaurant.name}</h3>
              
            </div>
            <div className={classes.buttondiv}>
                <button className={classes.detailbutton} onClick={Menuclick}> 메뉴  </button>
                
                <button className={classes.detailbutton} onClick={Infoclick}> 정보</button>
                <button className={classes.detailbutton} onClick={Reviewclick}> 리뷰</button>
            </div>
            
            <div className={classes.Info}>
                {Menus && <Menu data= {data.data.menu}></Menu>}
                {Infos && <Info></Info>}
                {Reviews && <Review></Review>}
            </div>
           
            <MDBModal open={scrollableModal} setOpen={setScrollableModal} tabIndex='-1'>
                <MDBModalDialog scrollable>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Your Shopping Cart</MDBModalTitle>
                            <MDBBtn
                                className='btn-close'
                                color='none'
                                onClick={() => setScrollableModal(!scrollableModal)}
                            ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <Cart></Cart>

                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={() => setScrollableModal(!setScrollableModal)}>
                                Close
                            </MDBBtn>
                            <MDBBtn>Order</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <MDBFooter bgColor='light' className={classes.footer}>
                <MDBContainer className='p-4'>
                    <MDBRow className={classes.row}>
                        <MDBCol>
                            <MDBBtn onClick={() => setScrollableModal(!scrollableModal)} > <AiOutlineFileSearch size="25" /> 주문 내역 </MDBBtn>
                        </MDBCol>
                        <MDBCol>
                            <Link to="/"> <AiFillHome size="50" />  </Link>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </MDBFooter>
        </>
    )
}
export default Shopdetail;

export async function loader({ params }) {
    try {

        const shopcate = params.foodMenu
        const shopdetail = params.shopid
      

        const response = await fetch(`http://localhost:8000/restaurants/${shopcate}/${shopdetail}`)

        const resData = await response.json();
        return resData
    }
    catch (err) {
        return err;
    }
}