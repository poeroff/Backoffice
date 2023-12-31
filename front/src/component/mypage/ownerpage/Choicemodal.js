
import { MDBFile, MDBModalBody, MDBInput, MDBBtn, MDBModal, MDBModalDialog, MDBRadio, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalFooter } from 'mdb-react-ui-kit';
import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import classes from "./Page.module.css"
import { AiOutlineClose } from "react-icons/ai";
import Deletemenu from './root/Deletemenu';

const Choicemodal = (props) => {
    const [choiceModal, setchoiceModalModal] = useState(true);
    const choiceModaltoggleOpen = () => {
        setchoiceModalModal(!choiceModal)
        props.valid()
    };
    const [addmenus, setaddmenu] = useState(false);
    const [deletemenus, setdeletemenus] = useState(false);
    const [image, setImage] = useState(null);
    const addname = useRef();
    const addprice = useRef();
    const adddescription = useRef()

    console.log(props.data.data.Restaurants[0].id)

    const onUpload = (e) => {
        const file = e.target.files[0];
        setImage(file)
    }


    const addMenu = () => {
        setaddmenu(!addmenus)
    }
    const deleteMenu = () =>{
        setdeletemenus(!deletemenus)
    }
    const menuaddhandler = (event) => {
        event.preventDefault()
        const formData = new FormData();
        
        formData.append("name", addname.current.value)
        formData.append("description", adddescription.current.value)
        formData.append("file", image)
        formData.append("price", addprice.current.value)
        console.log(addprice.current.value)
        const accessToken = sessionStorage.getItem("accesstoken")
        fetch(`http://localhost:8000/menus/${props.data.data.Restaurants[0].id}`, { method: "POST", headers: { authorization: 'Bearer ' + accessToken }, body: formData }).then(res => res.json()).then(resData => console.log(resData)).catch(err => console.log(err))

        choiceModaltoggleOpen()
        setaddmenu(false)


    }
 
    return (
        <MDBModal open={choiceModal} setOpen={setchoiceModalModal} tabIndex='-1' staticBackdrop >
            <MDBModalDialog>
                <MDBModalContent>
                <AiOutlineClose size="30" className={classes.xicon}  onClick={choiceModaltoggleOpen}/>
                    <MDBModalHeader>
                        <Link to={`http://localhost:3000/${props.data.data.Restaurants[0].cate}/${props.data.data.Restaurants[0].id}`}>
                            <MDBBtn type="submit" onClick={choiceModaltoggleOpen}>가게 홈</MDBBtn>
                        </Link>
                        <MDBBtn onClick={addMenu}>  음식 추가 </MDBBtn>
                        <MDBBtn onClick={deleteMenu}> 메뉴 삭제 </MDBBtn>
                        <MDBBtn >  메뉴 수정  </MDBBtn>

                    </MDBModalHeader>
                    {deletemenus && <Deletemenu data = {props.data.data.Restaurants[0].id}></Deletemenu>}
                    {addmenus && <MDBModalBody>
                        <form className={classes.choiceform} onSubmit={menuaddhandler}>
                            <MDBInput className='mb-3' label='메뉴 이름' type='text' ref={addname}></MDBInput>
                            <MDBInput className='mb-3' label='메뉴 설명' type='text' ref={adddescription}></MDBInput>
                            <MDBInput className='mb-3' label='메뉴 가격' type='number' ref={addprice} ></MDBInput>
                            <MDBFile className='mb-3' label='메뉴 사진' type='file' onChange={e => onUpload(e)}></MDBFile>
                            <MDBModalFooter>
                                <MDBBtn color='secondary' onClick={choiceModaltoggleOpen}>
                                    Close
                                </MDBBtn>
                                <MDBBtn  type='submit'>sumbit</MDBBtn>
                            </MDBModalFooter>
                        </form>
                    </MDBModalBody>}
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    )

}

export default Choicemodal