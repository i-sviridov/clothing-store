const reducers = {
  setDisplayedItems(state, action) {
    state.items = action.payload;
  },
  setItemCategory(state, action) {
    if (
      action.payload.category !== "all-products" &&
      state.price === "no-sorting"
    ) {
      state.items = action.payload.initialProps.filter((item) => {
        return item.category === action.payload.category;
      });
    }
    if (
      action.payload.category !== "all-products" &&
      state.price === "expensive"
    ) {
      state.items = action.payload.initialProps
        .filter((item) => {
          return item.category === action.payload.category;
        })
        .sort((a, b) => b.price - a.price);
    }
    if (action.payload.category !== "all-products" && state.price === "cheap") {
      state.items = action.payload.initialProps
        .filter((item) => {
          return item.category === action.payload.category;
        })
        .sort((a, b) => a.price - b.price);
    }

    if (
      action.payload.category === "all-products" &&
      state.price === "no-sorting"
    ) {
      state.items = action.payload.initialProps;
    }
    if (
      action.payload.category === "all-products" &&
      state.price === "expensive"
    ) {
      state.items = [...action.payload.initialProps].sort(
        (a, b) => b.price - a.price
      );
    }
    if (action.payload.category === "all-products" && state.price === "cheap") {
      state.items = [...action.payload.initialProps].sort(
        (a, b) => a.price - b.price
      );
    }
    state.category = action.payload.category;

    state.currentPage = state.items.length < 7 ? 1 : state.currentPage;
  },
  sortByPrice(state, action) {
    if (
      action.payload.price === "no-sorting" &&
      state.category !== "all-products"
    ) {
      state.items = action.payload.initialProps.filter((item) => {
        return item.category === state.category;
      });
      state.price = action.payload.price;
    }

    if (
      action.payload.price === "no-sorting" &&
      state.category === "all-products"
    ) {
      state.items = action.payload.initialProps;
      state.price = action.payload.price;
    }
    if (action.payload.price === "expensive") {
      (state.items = state.items.sort((a, b) => b.price - a.price)),
        (state.price = action.payload.price);
    }
    if (action.payload.price === "cheap") {
      (state.items = state.items.sort((a, b) => a.price - b.price)),
        (state.price = action.payload.price);
    }
  },
  setCurrentPage(state, action) {
    state.currentPage = action.payload;
  },
};

export default reducers;
