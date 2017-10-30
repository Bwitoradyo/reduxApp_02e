"use strict";

import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Carousel,Grid, Row, Col, Button} from "react-bootstrap";
import {getBooks} from "../../actions/booksActions";

import BookItem from "./bookItem";
import BooksForm from "./booksForm";
import Cart from "./cart";

class BooksList extends React.Component{
  
  componentDidMount(){
    this.props.getBooks()
  }	
	
  render(){
    const booksList = this.props.books.map(
      (booksArr) => {
         return(
	   <Col xs={12} sm={6} md={4} key={booksArr._id}>
	     <BookItem
	       _id={booksArr._id}
	       title={booksArr.title}
	       description={booksArr.description}
	       images={booksArr.images}
	       price={booksArr.price}
	     />
	   </Col>
	 )
      }		    
    )
    return(
      <Grid>
        <Row>
	  <Carousel>
            <Carousel.Item>
              <img width={900} height={500} alt="900x300" src="/images/carousel.png" />
              <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x300" src="/images/carousel2.png" />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
	</Row>
        <Row>
	  <Cart />
	</Row>
        <Row style={{marginTop:"15px"}}>
	  {booksList} 
	</Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    books: state.books.books
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getBooks: getBooks
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
