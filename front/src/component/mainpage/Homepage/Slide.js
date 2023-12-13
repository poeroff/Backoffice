import {MDBCarousel,MDBCarouselItem} from 'mdb-react-ui-kit';
import React from "react"
import classes from "./Slide.module.css"
const Slide =() =>{
    return (
        <MDBCarousel showControls showIndicators touch={false} className={classes.abc}>
        <MDBCarouselItem className ={classes.item} itemId={1}>
          <img  className ={classes.itemimg}src='https://mdbootstrap.com/img/new/slides/041.jpg' alt='...' />
        </MDBCarouselItem>
        <MDBCarouselItem className ={classes.item} itemId={2}>
          <img src='https://mdbootstrap.com/img/new/slides/042.jpg' className='d-block w-100' alt='...' />
        </MDBCarouselItem>
        <MDBCarouselItem className ={classes.item} itemId={3}>
          <img src='https://mdbootstrap.com/img/new/slides/043.jpg' className='d-block w-100' alt='...' />
        </MDBCarouselItem>
      </MDBCarousel>
      
      );
}
export default Slide;