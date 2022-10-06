import React from 'react';
import { useReducer } from 'react';

export const FavoritesContext = React.createContext({
  items: [],
  amount: 0,
  addItem: (id) => {},
  deleteItem: (id) => {},
});

const defaultFavoritesState = {
  items: [],
  amount: 0,
};

function favoritesReducer(state, action) {
  if (action.type === 'ADD') {
    return { items: state.items.concat(action.id), amount: state.amount + 1 };
  }

  if (action.type === 'DELETE') {
    const index = state.items.indexOf(action.id);
    const updatedArray = state.items.splice(index, 1);

    return {
      items: updatedArray,
      amount: state.amount - 1,
    };
  }

  return defaultFavoritesState;
}

export function FavoritesContextProvider(props) {
  const [favoritesState, dipsatchFavoritesAction] = useReducer(
    favoritesReducer,
    defaultFavoritesState
  );

  function addItemToFavorites(id) {
    dipsatchFavoritesAction({ type: 'ADD', id: id });
  }

  function deleteItemFromFavorites(id) {
    dipsatchFavoritesAction({ type: 'DELETE', id: id });
  }

  const context = {
    items: favoritesState.items,
    amount: favoritesState.amount,
    addItem: addItemToFavorites,
    deleteItem: deleteItemFromFavorites,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}
