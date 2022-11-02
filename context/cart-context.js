import React from 'react';

import cartReducer from './cart-lib/cart-reducer';

export const CartContext = React.createContext({
  items: [],
  cartSum: 0,
  isOpen: false,
  addToCartHandler: function () {},
  openCartHandler: function () {},
  closeCartHandler: function () {},
  itemAmountChangeHandler: function () {},
  deleteItemHandler: function () {},
});

const defaultCartState = {
  items: [],
  cartSum: 0,
  isOpen: false,
};

export function CartContextProvider(props) {
  const [cartState, dispatchCartAction] = React.useReducer(
    cartReducer,
    defaultCartState
  );

  const { items, isOpen, cartSum } = cartState;

  function addToCartHandler(
    id,
    title,
    imageUrl,
    color,
    size,
    initialPrice,
    amountItems,
    totalSum
  ) {
    for (let item of items) {
      if (item.id === id && item.color === color && item.size === size) {
        dispatchCartAction({
          type: 'ADD_EXISTING_ITEM',
          id,
          amountItems,
          totalSum,
        });
        return true;
      }
    }

    dispatchCartAction({
      type: 'ADD_TO_CART',
      id,
      title,
      imageUrl,
      color,
      size,
      initialPrice,
      amountItems,
      totalSum,
    });
  }

  function deleteItemHandler(id, color, size) {
    dispatchCartAction({
      type: 'DELETE_ITEM',
      id,
      color,
      size,
    });
  }

  function openCartHandler() {
    dispatchCartAction({
      type: 'CART_OPEN',
    });
  }

  function closeCartHandler() {
    dispatchCartAction({
      type: 'CART_CLOSE',
    });
  }

  function itemAmountChangeHandler(id, color, size, amount) {
    if (amount < 1) {
      dispatchCartAction({
        type: 'DELETE_ITEM',
        id,
        color,
        size,
      });
      return;
    }

    let newAmount = amount;
    if (amount > 10) {
      newAmount = 10;
    }

    dispatchCartAction({
      type: 'CHANGE_ITEM_AMOUNT',
      id,
      newAmount,
    });
  }

  const context = {
    items,
    cartSum,
    isOpen,
    addToCartHandler,
    openCartHandler,
    closeCartHandler,
    itemAmountChangeHandler,
    deleteItemHandler,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
}
