import React from 'react';
import { useReducer } from 'react';

export const FavoritesContext = React.createContext({
  items: [],
  amount: 0,
  addItem: (id) => {},
  deleteItem: (id) => {},
  fetchCookiesData: (items, amount) => {},
});

const defaultFavoritesState = {
  items: [],
  amount: 0,
};

function favoritesReducer(state, action) {
  if (action.type === 'ADD') {
    document.cookie = `${action.id}=${action.id}`;
    if (state.items.includes(action.id)) {
      return state;
    }
    return { items: state.items.concat(action.id), amount: state.amount + 1 };
  }

  if (action.type === 'DELETE') {
    document.cookie = `${action.id}=;expires=` + new Date(0).toUTCString();
    const index = state.items.indexOf(action.id);
    const updatedArray = state.items.splice(index, 1);

    return {
      items: updatedArray,
      amount: state.amount - 1,
    };
  }

  if (action.type === 'COOKIES_AMOUNT') {
    return {
      items: action.items,
      amount: action.amount,
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
    dipsatchFavoritesAction({ type: 'ADD', id });
  }

  function deleteItemFromFavorites(id) {
    dipsatchFavoritesAction({ type: 'DELETE', id });
  }

  function fetchFromCookies(items, amount) {
    dipsatchFavoritesAction({
      type: 'COOKIES_AMOUNT',
      items,
      amount,
    });
  }

  const context = {
    items: favoritesState.items,
    amount: favoritesState.amount,
    addItem: addItemToFavorites,
    deleteItem: deleteItemFromFavorites,
    fetchCookiesData: fetchFromCookies,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}
