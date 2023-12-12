
import React from "react"
import { MDBInputGroup, MDBCard, MDBBtn, MDBCardImage, MDBCardBody, MDBCardText } from 'mdb-react-ui-kit';
import classes from "./Home.module.css"
import { Link } from "react-router-dom";




const Home = () => {
    return (
        <>
            <div className={classes.btn}>
                <MDBCard className={classes.Delivery}>
                    <button className={classes.DeliveryBtn}><MDBCardImage src='https://img.insight.co.kr/static/2018/11/07/700/c17le5e294hei50a940d.jpg' alt='...Delivery' position='top' />  <p>배달 </p> </button>
                </MDBCard>
                <MDBCard className={classes.Packaging}>
                    <button className={classes.PackagingBtn}><MDBCardImage src='https://cdn-mart.baemin.com/goods/76/1559286005243m0.jpg' alt='...Packaging' position='top' /> <p>포장 </p> </button>
                </MDBCard>
            </div>
            <MDBInputGroup className={classes.Homebtn}>
                <input className={`form-control ${classes.inputWithButton}`} type='text' />
                <MDBBtn> Search </MDBBtn>
            </MDBInputGroup>
            <form className={classes.OrderMenu}>
                <div className={classes.flexContainer}>
                    <Link to ="pizze" className={classes.menuItem}>
                        <img src="https://cdn-icons-png.flaticon.com/128/5861/5861040.png" alt="Pizza Icon" />
                        <p>피자</p>
                    </Link>
                    <Link to ="fastfood" className={classes.menuItem}>
                        <img src="https://cdn-icons-png.flaticon.com/128/5508/5508475.png" alt="Pizza Icon" />
                        <p>패스트푸드</p>
                    </Link>
                    <Link to ="snack_bar" className={classes.menuItem}>
                        <img src="https://cdn-icons-png.flaticon.com/128/2276/2276869.png" alt="Other Icon" />
                        <p>분식</p>
                    </Link>

                    <Link to ="salad" className={classes.menuItem}>
                        <img src="https://cdn-icons-png.flaticon.com/128/8269/8269621.png" alt="Other Icon" />
                        <p>샐러드</p>
                    </Link>
                    <Link to ="korean_cuisine" className={classes.menuItem}>
                        <img src="https://cdn-icons-png.flaticon.com/128/501/501846.png" alt="Other Icon" />
                        <p>한식</p>
                    </Link>
                </div>
                <div className={classes.flexContainer}>
                    <Link to ="meat" className={classes.menuItem}>
                        <img src="https://cdn-icons-png.flaticon.com/128/6293/6293026.png" alt="Pizza Icon" />
                        <p>고기</p>
                    </Link>
                    <Link to ="Fried" className={classes.menuItem}>
                        <img src="https://cdn-icons-png.flaticon.com/128/2713/2713993.png" alt="Pizza Icon" />
                        <p>튀김류</p>
                    </Link>
                    <Link to ="midnight " className={classes.menuItem}>
                        <img src="https://cdn-icons-png.flaticon.com/128/5459/5459162.png" alt="Other Icon" />
                        <p>야식</p>
                    </Link>

                    <Link to ="dessert" className={classes.menuItem}>
                        <img src="https://cdn-icons-png.flaticon.com/128/7478/7478255.png" alt="Other Icon" />
                        <p>디저트</p>
                    </Link>
                    <Link to ="noodles" className={classes.menuItem}>
                        <img src="https://cdn-icons-png.flaticon.com/128/2276/2276941.png" alt="Other Icon" />
                        <p>면류</p>
                    </Link>
                </div>
            </form>
        </>


    )


}

export default Home