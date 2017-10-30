"use strict"

//DEFINE REDUCER
export const booksReducers = (state={books:[]}, action) => {
  switch(action.type){


    case "GET_BOOKS":
      return{...state, books:[...action.payload]}
      break;

    case "POST_BOOKS":
      return {...state, books:[...state.books, ...action.payload], msg:"Saved! Click to continue", style:"success", validation:"success"}
      break;

    case "POST_BOOK_REJECTED":
      return {...state, msg:"Please try again", style:"danger", validation:"error"}
      break;

    case "DELETE_BOOK":
      const currentBooksToDelete = [...state.books]
      const indexToDelete = currentBooksToDelete.findIndex((book)=>{
        return book._id.toString() === action.payload //this can also be achieved without to string and use == instead
      });
      return {books:[...currentBooksToDelete.slice(0, indexToDelete), ...currentBooksToDelete.slice(indexToDelete + 1)]}
      break;

    case "UPDATE_BOOK":
      const currentBooksToUpdate = [...state.books]
      const indexToUpdate = currentBooksToUpdate.findIndex((book)=>{
        return book._id === action.payload._id
      });
      const newBooksToUpdate = {...currentBooksToUpdate[indexToUpdate], title: action.payload.title, description: action.payload.description}
      return {books:[...currentBooksToUpdate.slice(0, indexToUpdate), newBooksToUpdate,  ...currentBooksToUpdate.slice(indexToUpdate + 1)]}
      break;

    case "RESET_BUTTON":
      return{...state, msg:null, style:"primary", validation:null}
      break
  }
  return state;
};


 
