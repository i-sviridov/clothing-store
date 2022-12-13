const reducers = {
  addItemToFavorites(state, action) {
    if (state.items.includes(action.payload)) {
      return;
    }
    state.items = state.items.concat(action.payload);
    state.amount = state.amount + 1;
  },
  deleteItemFromFavorites(state, action) {
    let updatedArray = state.items.filter((item) => {
      return item !== action.payload;
    });
    state.items = updatedArray;
    state.amount = state.amount - 1;
  },
  updateInitialStateViaFetchingCookies(state, action) {
    state.items = action.payload.items;
    state.amount = action.payload.amount;
  },
};

export default reducers;
