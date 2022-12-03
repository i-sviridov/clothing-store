const reducers = {
  addItemToCart(state, action) {
    // Check if the item is already part of the cart
    for (let item of state.items) {
      if (
        item.id === action.payload.id &&
        item.color === action.payload.color &&
        item.size === action.payload.size
      ) {
        const existingCartItemIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        const existingItem = state.items[existingCartItemIndex];

        let updatedItem = {
          ...existingItem,
          amountItems: existingItem.amountItems + action.payload.amountItems,
          totalSum: existingItem.totalSum + action.payload.totalSum,
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

        (state.isOpen = true),
          (state.cartSum = updatedSum),
          (state.items = updatedItems);

        return;
      }
    }
    // There is no equal item in the cart - adding a new one
    state.isOpen = true;
    (state.cartSum = state.cartSum + action.payload.totalSum),
      (state.items = state.items.concat({
        id: action.payload.id,
        title: action.payload.title,
        imageUrl: action.payload.imageUrl,
        color: action.payload.color,
        size: action.payload.size,
        initialPrice: action.payload.initialPrice,
        amountItems: action.payload.amountItems,
        totalSum: action.payload.totalSum,
      }));
  },
  deleteItemFromCart(state, action) {
    const existingCartItemIndex = state.items.findIndex(
      (item) =>
        item.id === action.payload.id &&
        item.color === action.payload.color &&
        item.size === action.payload.size
    );

    const updatedItems = [...state.items];
    updatedItems.splice(existingCartItemIndex, 1);

    const updatedSum = updatedItems.reduce((prevValue, curValue) => {
      return prevValue + curValue.totalSum;
    }, 0);

    state.cartSum = updatedSum;
    state.items = updatedItems;
  },
  setNewItemCartAmount(state, action) {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.payload.id
    );
    const existingItem = state.items[existingCartItemIndex];

    let updatedItem = {
      ...existingItem,
      amountItems: action.payload.newAmount,
      totalSum: existingItem.initialPrice * action.payload.newAmount,
    };

    const updatedItems = [...state.items];
    updatedItems[existingCartItemIndex] = updatedItem;

    const updatedSum = updatedItems.reduce((prevValue, curValue) => {
      return prevValue + curValue.totalSum;
    }, 0);

    state.cartSum = updatedSum;
    state.items = updatedItems;
  },
  closeCart(state) {
    state.isOpen = false;
  },
  openCart(state) {
    state.isOpen = true;
  },
  clearCart(state) {
    state.items = [];
    state.cartSum = 0;
    state.isOpen = false;
  },
};

export default reducers;
