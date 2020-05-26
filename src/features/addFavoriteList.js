import { createAction, createReducer } from "@reduxjs/toolkit";

const addToMovieList = createAction("add to movielist");
const removeFromMovieList = createAction("remove from movielist");
const updateMovieList = createAction("remove from movielist");

const actions = { addToMovieList, removeFromMovieList, updateMovieList };

const initialState = [
  {
  	film: { id: '13323', title: 'Spiderman', poster: 'http://www.4motiondarlington.org/wp-content/uploads/2013/06/No-image-found.jpg',description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel orci iaculis odio pellentesque aliquam. Nam consectetur posuere odio, sit amet finibus leo pharetra ac.', genre: 'Action', year: '2012', rating: '5,5', ofType: "Movie" },
  }
];

const reducer = createReducer(initialState, {
  [addToMovieList]: (state, action) => {
    let found = state.find(
      (movieItem) => movieItem.film.title === action.payload.title
    );
    if (found) {
      return state.map((movieItem) => {
        if (movieItem.film.title === action.payload.title) {
          return { ...movieItem };
        } else {
          return movieItem;
        }
      });
    } else {
      return [...state, { film: action.payload }];
    }
  },

  [updateMovieList]: (state, action) => state.map((movieItem, index) => {
    if( movieItem.film.title === action.payload.title ) {
        return action.payload;
    } else {
        return movieItem
    }
}),

  [removeFromMovieList]: (state, action) =>
    state.filter((movieItem) => movieItem.film.title !== action.payload),
});

export { actions, reducer };