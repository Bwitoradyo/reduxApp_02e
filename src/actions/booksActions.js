"use strict"
import axios from "axios";

//GET BOOKS
export const getBooks = () => {
  return (dispatch) => {
    axios.get("/api/books")
      .then((response) =>{
        dispatch({type:"GET_BOOKS", payload:response.data})
      })
      .catch((err) => {
        dispatch({type:"GET_BOOKS_REJECTED", payload:err})
      })
  }
}

export const deleteBooks = (_id) => {
  return (dispatch) => {
    axios.delete("/api/books/"+ _id)
      .then((response) => {
        dispatch({type:"DELETE_BOOK", payload:_id})
      })
      .catch((err) => {
        dispatch({type:"DELETE_BOOK_REJECTED", payload:err})
      })
  } 
}

//UPDATE BOOK
export const updateBooks = (book) => {
  return {
    type: "UPDATE_BOOK",
    payload: book
  }
}

//RESET FORM BUTTON
export const resetButton = () => {
  return {
    type: "RESET_BUTTON"
  }
}


export const postBooks = (book) =>{
  return (dispatch) => {
    axios.post("/api/books", book)
      .then((response) => {
        dispatch({type:"POST_BOOKS", payload:response.data})
      })
      .catch((err) => {
        dispatch({type:"POST_BOOKS_REJECTED", payload:"there was an error while posting a new book"})
      })
  }
}
