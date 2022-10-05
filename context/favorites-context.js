import React from 'react';
import { useReducer } from 'react';

export const FavoritesContext = React.createContext({
  items: [],
  favoritesAmount: 0,
  addItem: (item) => {},
  deleteItem: (id) => {},
});

const defaultFavoritesState = {
  items: [],
  favoritesAmount: 0,
};

function favoritesReducer(state, action) {
  if (action.type === 'ADD') {
    return {
      items: [],
      favoritesAmount: state.favoritesAmount + 1,
    };
  }

  return defaultFavoritesState;
}

export function FavoritesContextProvider(props) {
  const [favoritesState, dipsatchFavoritesAction] = useReducer(
    favoritesReducer,
    defaultFavoritesState
  );

  function addItemToFavorites(item) {
    dipsatchFavoritesAction({ type: 'ADD', item: item });
  }

  function deleteItemFromFavorites(id) {
    dipsatchFavoritesAction({ type: 'DELETE', id: id });
  }

  const context = {
    items: favoritesState.items,
    favoritesAmount: favoritesState.favoritesAmount,
    addItem: addItemToFavorites,
    deleteItem: deleteItemFromFavorites,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}
