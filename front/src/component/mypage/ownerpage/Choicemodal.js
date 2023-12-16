
import { MDBFile, MDBModalBody, MDBInput, MDBBtn, MDBModal, MDBModalDialog, MDBRadio, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalFooter } from 'mdb-react-ui-kit';
import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import classes from "./Page.module.css"

const Choicemodal = (props) => {
    const [choiceModal, setchoiceModalModal] = useState(true);
    const choiceModaltoggleOpen = () =>{ setchoiceModalModal(!choiceModal)
    props.valid()};
    const [addmenus, setaddmenu] = useState(false);
    const [basicModal, setBasicModal] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [image, setImage] = useState(null);
    const addname = useRef();
    const addprice = useRef();
    const adddescription = useRef()
    
   

   
    const addMenu = () => {
        setaddmenu(!addmenus)

    }
    const menuaddhandler = (event) => {
       

        const formData = new FormData();
        formData.append("name", addname.current.value)
        formData.append("description", adddescription.current.value)
        formData.append("file", image)
        formData.append("price", addprice.current.value)
        console.log(addprice.current.value)
        const accessToken = sessionStorage.getItem("accesstoken")
        //fetch(`http://localhost:8000/menus/${shopid}`, { method: "POST", headers: { authorization: 'Bearer ' + accessToken }, body: formData }).then(res => res.json()).then(resData => console.log(resData)).catch(err => console.log(err))
        setBasicModal(!setBasicModal)


    }
    return (
        <MDBModal open={choiceModal} setOpen={setchoiceModalModal} tabIndex='-1' staticBackdrop >
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <Link to ={`http://localhost:3000/${props.data.data.Restaurants[0].cate}/${props.data.data.Restaurants[0].id}`}>
                        <MDBBtn type="submit" onClick={choiceModaltoggleOpen}>가게 홈</MDBBtn>
                        </Link>
                        <MDBBtn onClick={addMenu}>음식 추가 </MDBBtn>
                        
                    </MDBModalHeader>
                    {addmenus &&<MDBModalFooter>
                        <form className={classes.choiceform}>
                        <MDBInput className='mb-3'label='메뉴 이름'  type='text' ></MDBInput>
                        <MDBInput  className='mb-3'label='메뉴 설명'  type='text' ></MDBInput>
                        <MDBInput  className='mb-3' label='메뉴 가격'  type='number' ></MDBInput>
                        <MDBFile className='mb-' label='메뉴 사진' type='file' ></MDBFile>
                            
                        </form>
                     
                    </MDBModalFooter>}
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    )

}

export default Choicemodal