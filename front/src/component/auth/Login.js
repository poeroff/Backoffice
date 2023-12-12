import React, { useState } from 'react';
import { MDBContainer, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import Kakao from './Kakao';
import Google from './Google';
import classes from "./Login.module.css"
const Login = () => {
    const [justifyActive, setJustifyActive] = useState('tab1');;
    const [kakao , setkakao] = useState(false);

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    const kakaobutton = () =>{
        setkakao(!kakao)
        
     
    }
        
    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        Login
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        Register
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>
            {justifyActive === "tab1" && <div>
                <div className="text-center mb-3">
                    <p>Sign in with:</p>

                    <div className={classes.Login}>
                        <Kakao></Kakao>
                    </div>
                    <div className={classes.Google}>
                        <Google></Google>
                    </div>

                    <p className="text-center mt-3">or:</p>
                </div>

                <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' />
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />


                <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
               
            </div>}


            {justifyActive === "tab2" && <div>
             

               
                <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' />
                <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' />
                <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' />

                

                <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
            </div>}


        </MDBContainer>
    );


}
export default Login