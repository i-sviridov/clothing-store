export default function cartReducer(state, action) {
  if (action.type === 'ADD_TO_CART') {
    return {
      isOpen: true,
      cartSum: state.cartSum + action.totalSum,
      items: state.items.concat({
        id: action.id,
        title: action.title,
        imageUrl: action.imageUrl,
        color: action.color,
        size: action.size,
        initialPrice: action.initialPrice,
        amountItems: action.amountItems,
        totalSum: action.totalSum,
      }),
    };
  }

  if (action.type === 'DELETE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) =>
        item.id === action.id &&
        item.color === action.color &&
        item.size === action.size
    );

    const updatedItems = [...state.items];
    updatedItems.splice(existingCartItemIndex, 1);

    const updatedSum = updatedItems.reduce((prevValue, curValue) => {
      return prevValue + curValue.totalSum;
    }, 0);

    return {
      ...state,
      cartSum: updatedSum,
      items: updatedItems,
    };
  }

  if (action.type === 'ADD_EXISTING_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];

    let updatedItem = {
      ...existingItem,
      amountItems: existingItem.amountItems + action.amountItems,
      totalSum: existingItem.totalSum + action.totalSum,
    };

    if (updatedItem.amountItems > 10) {
      updatedItem = {
        ...existingItem,
        amountItems: 10,
        totalSum: existingItem.initialPrice * 10,
      };
    }

    const updatedItems = [...state.items];
    updatedItems[existingCartItemIndex] = updatedItem;

    const updatedSum = updatedItems.reduce((prevValue, curValue) => {
      return prevValue + curValue.totalSum;
    }, 0);

    return {
      ...state,
      isOpen: true,
      cartSum: updatedSum,
      items: updatedItems,
    };
  }

  if (action.type === 'CHANGE_ITEM_AMOUNT') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];

    let updatedItem = {
      ...existingItem,
      amountItems: action.newAmount,
      totalSum: existingItem.initialPrice * action.newAmount,
    };

    const updatedItems = [...state.items];
    updatedItems[existingCartItemIndex] = updatedItem;

    const updatedSum = updatedItems.reduce((prevValue, curValue) => {
      return prevValue + curValue.totalSum;
    }, 0);

    return {
      ...state,
      cartSum: updatedSum,
      items: updatedItems,
    };
  }

  if (action.type === 'CART_OPEN') {
    return {
      ...state,
      isOpen: true,
    };
  }

  if (action.type === 'CART_CLOSE') {
    return {
      ...state,
      isOpen: false,
    };
  }

  if (action.type === 'CLEAR_CART') {
    return {
      items: [],
      cartSum: 0,
      isOpen: false,
    };
  }
}
