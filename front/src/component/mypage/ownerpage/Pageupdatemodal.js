import { MDBFile, MDBModalBody, MDBInput,  MDBBtn, MDBModal, MDBModalDialog, MDBRadio, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalFooter } from 'mdb-react-ui-kit';
import React, { useState, useRef } from "react";

const Pageupdatemodal = (props) =>{
    const [updateModal, setupdateModal] = useState(true);
    const updatetoggleOpen = () => {
        setupdateModal(!updateModal)
        props.valid()};
    const [selectedFood, setSelectedFood] = useState("Pizza");
    const shopname = useRef();
    const shopdescription = useRef();
    const [image, setImage] = useState(null);
 
    const onUpload = (e) => {
        const file = e.target.files[0];
        setImage(file)
    }
    const handleRadioChange = (event) => {
        setSelectedFood(event.target.value);
    };
    const submithandler = (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("name", shopname.current.value)
        formData.append("description", shopdescription.current.value)
        formData.append("file", image)
        formData.append("cate", selectedFood)
        
        const accessToken = sessionStorage.getItem("accesstoken")
        fetch(`http://localhost:8000/restaurants/${props.data.data.Restaurants[0].cate}/${props.data.data.Restaurants[0].id}`, { method: "put", headers: { authorization: 'Bearer ' + accessToken } ,body:formData }).then(res => res.json()).then(resData => console.log(resData)).catch(err => console.log(err))
        props.valid()
    }
    return (
        <MDBModal open={updateModal} setOpen={setupdateModal} tabIndex='-1' staticBackdrop >
        <MDBModalDialog>
            <MDBModalContent>
                <MDBModalHeader>
                    <MDBModalTitle>가게 업데이트</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={updatetoggleOpen}></MDBBtn>
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
                            <MDBRadio type="radio" name='flexRadioDefault' value='Pizza' label='Pizza' onClick={handleRadioChange} />
                            <MDBRadio type="radio" name='flexRadioDefault' value='FastFood' label='FastFood' onClick={handleRadioChange} defaultChecked />
                            <MDBRadio type="radio" name='flexRadioDefault' value='SnackBar' label='SnackBar' onClick={handleRadioChange} defaultChecked />
                            <MDBRadio type="radio" name='flexRadioDefault' value='Salad' label='Salad' onClick={handleRadioChange} defaultChecked />
                            <MDBRadio type="radio" name='flexRadioDefault' value='KoreanCuisine' label='KoreanCuisine' onClick={handleRadioChange} defaultChecked />
                            <MDBRadio type="radio" name='flexRadioDefault' value='Meat' label='Meat' onClick={handleRadioChange} defaultChecked />
                            <MDBRadio type="radio" name='flexRadioDefault' value='Fried' label='Fried' onClick={handleRadioChange} defaultChecked />
                            <MDBRadio type="radio" name='flexRadioDefault' value='Midnight' label='Midnight' onClick={handleRadioChange} defaultChecked />
                            <MDBRadio type="radio" name='flexRadioDefault' value='Dessert' label='Dessert' onClick={handleRadioChange} defaultChecked />
                            <MDBRadio type="radio" name='flexRadioDefault' value='Noodles' label='Noodles' onClick={handleRadioChange} defaultChecked />
                        </div>
                        <div className="mb-3">
                            <MDBFile
                                labelClass='col-form-label'
                                label='베너 이미지'
                                onChange={e => onUpload(e)}>
                            </MDBFile>
                        </div>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={updatetoggleOpen}>
                                Close
                            </MDBBtn>
                            <MDBBtn type="submit">Understood</MDBBtn>
                        </MDBModalFooter>
                    </form>
                </MDBModalBody>
            </MDBModalContent>
        </MDBModalDialog>
    </MDBModal>

    )

}
export default Pageupdatemodal