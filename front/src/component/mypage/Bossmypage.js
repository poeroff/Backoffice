import classes from "./Bossmypage.module.css"
import { AiOutlineUser } from "react-icons/ai";
import { MDBCol, MDBContainer, MDBFile, MDBRow, MDBCard, MDBFooter, MDBModalBody, MDBInput, MDBCardBody, MDBBtn, MDBModal, MDBModalDialog, MDBRadio, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalFooter } from 'mdb-react-ui-kit';
import { AiOutlineSolution } from "react-icons/ai";

import { BsChatLeftText } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import { BiLogOut } from "react-icons/bi";

const Bossmypage = () => {
    const [basicModal, setBasicModal] = useState(false);
    const [selectedFood, setSelectedFood] = useState("Pizza");
    const navigate = useNavigate();
    const shopname = useRef();
    const shopdescription = useRef();

    const [image, setImage] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);

    const toggleOpen = () => setBasicModal(!basicModal);
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
    const handleRadioChange = (event) => {
        console.log(event.target.value)
        setSelectedFood(event.target.value);
    };
    const submithandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", shopname.current.value)
        formData.append("description", shopdescription.current.value)
        formData.append("file", image)
        formData.append("cate", selectedFood)

        fetch("http://localhost:8000/restaurants", { method: "POST", headers: {}, body: formData }).then(res => res.json()).then(resData => console.log(resData)).catch(err => console.log(err))

    }
    const Logouthandler = (event) => {
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("accesstoken")
        navigate("/")
        window.location.reload();
    }
    return (

        <div className="vh-100" style={{ backgroundColor: '#eee' }}>
            <MDBContainer>
                <MDBRow className="justify-content-center">
                    <MDBCol md="9" lg="7" xl="5" className="mt-5">
                        <MDBCard style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }}>
                            <MDBCardBody className="p-4 text-black">
                                <div>
                                </div>
                                <div className="d-flex align-items-center mb-4">
                                    <div className="flex-shrink-0">
                                        <AiOutlineUser size="75" />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <button className={classes.plus} onClick={toggleOpen}><AiOutlinePlus size="25" /> </button>
                                        <div className="d-flex flex-row align-items-center mb-2">
                                            <p className="mb-0 me-2">nickname</p>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className={classes.mypagebtn}>
                                    <AiOutlineSolution size="60" className={classes.icon} />
                                    <BsChatLeftText size="55" className={classes.icon} />
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Modal title</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form onSubmit={submithandler}>
                                <div className='mb-3'>
                                    <MDBInput
                                        labelClass='col-form-label'
                                        label='가게명:'
                                        ref={shopname}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <MDBInput
                                        labelClass='col-form-label'
                                        label='설명:'
                                        ref={shopdescription}
                                    />
                                </div>
                                <div>
                                    <MDBRadio type="radio" name='flexRadioDefault' value='Pizza' label='Pizza' onChange={handleRadioChange} />
                                    <MDBRadio type="radio" name='flexRadioDefault' value='FastFood' label='FastFood' onChange={handleRadioChange} defaultChecked />
                                    <MDBRadio type="radio" name='flexRadioDefault' value='SnackBar' label='SnackBar' onChange={handleRadioChange} defaultChecked />
                                    <MDBRadio type="radio" name='flexRadioDefault' value='Salad' label='Salad' onChange={handleRadioChange} defaultChecked />
                                    <MDBRadio type="radio" name='flexRadioDefault' value='KoreanCuisine' label='KoreanCuisine' onChange={handleRadioChange} defaultChecked />
                                    <MDBRadio type="radio" name='flexRadioDefault' value='Meat' label='Meat' onChange={handleRadioChange} defaultChecked />
                                    <MDBRadio type="radio" name='flexRadioDefault' value='Fried' label='Fried' onChange={handleRadioChange} defaultChecked />
                                    <MDBRadio type="radio" name='flexRadioDefault' value='Midnight' label='Midnight' onChange={handleRadioChange} defaultChecked />
                                    <MDBRadio type="radio" name='flexRadioDefault' value='Dessert' label='Dessert' onChange={handleRadioChange} defaultChecked />
                                    <MDBRadio type="radio" name='flexRadioDefault' value='Noodles' label='Noodles' onChange={handleRadioChange} defaultChecked />
                                </div>
                                <div className="mb-3">
                                    <MDBFile
                                        labelClass='col-form-label'
                                        label='베너 이미지'
                                        onChange={e => onUpload(e)}>
                                    </MDBFile>
                                </div>

                                <MDBModalFooter>
                                    <MDBBtn color='secondary' onClick={toggleOpen}>
                                        Close
                                    </MDBBtn>
                                    <MDBBtn onClick={toggleOpen} type="submit">Understood</MDBBtn>
                                </MDBModalFooter>
                            </form>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
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

        </div >

    )

}
export default Bossmypage;