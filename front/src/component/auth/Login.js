import React, { useState , useRef } from 'react';
import { MDBContainer, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import Kakao from './Kakao';
import Google from './Google';
import classes from "./Login.module.css"
const Login = () => {
    const [justifyActive, setJustifyActive] = useState('tab1');
    const Signusername = useRef();
    const Signemail= useRef();
    const Signpassword = useRef();
    const SignConfirmpassword = useRef();
    const loginemail = useRef();
    const loginpassword = useRef();

    const signsubmithandler = (event) =>{
        event.preventDefault();
        fetch("",{
            method : "POST" ,  
            headers :{ "Contet-Type" : "application/json"},
            body : JSON.stringify({email : Signemail.current.value, password : Signpassword.current.value ,Confirmpassword : SignConfirmpassword.current.value , username : Signusername.current.value})})
            .then(res => res.json()).catch(err=>{
            console.log(err);
        })
    }

    const loginsubmithandler = (event)=>{
        event.preventDefault();
        fetch("",{method : "POST" , headers : {"Content-Type" : "application/json"} , body : JSON.stringify({email : loginemail.current.value ,password : loginpassword.current.value})})
        .then(res=>res.json())
        .then(resData => console.log(resData)).catch(err =>{
            console.log(err);
        })
    }

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

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
            {justifyActive === "tab1" && <form onSubmit={loginsubmithandler}>
                <div className="text-center mb-3">
                    <p>Sign in with:</p>
                    <div className={classes.signin}>
                        <div className={classes.Login}>
                            <Kakao></Kakao>
                        </div>
                        <div className={classes.Google}>
                            <Google></Google>
                        </div>
                    </div>
                    <p className="text-center mt-3">or:</p>
                </div>
                <MDBInput wrapperClass='mb-4' label='Email address'  type='email' ref={loginemail}/>
                <MDBInput wrapperClass='mb-4' label='Password' type='password' ref={loginpassword}/>
                <MDBBtn className="mb-4 w-100" type='submit'>Sign in</MDBBtn>
            </form>}

            {justifyActive === "tab2" && <form onSubmit={signsubmithandler}>
                <MDBInput wrapperClass='mb-4' label='Username' type='text' ref={Signusername}/>
                <MDBInput wrapperClass='mb-4' label='Email'  type='email' ref={Signemail}/>
                <MDBInput wrapperClass='mb-4' label='Password' type='password' ref={Signpassword} />
                <MDBInput wrapperClass='mb-4' label='Password' type='password' ref={SignConfirmpassword} />
                <MDBBtn className="mb-4 w-100" type='submit'>Sign up</MDBBtn>
            </form>}
        </MDBContainer>
    );
}
export default Login