const initState = {
  activeCategory: {},
};

export const categoriesReducer = (state = initState, action) => {
  const { type, payload } = action;
  let newState;
  switch (type) {
    case "SET_ACTIVE_CATEGORY": {
      newState = { ...state, activeCategory: payload };
      break;
    }
    default: {
      newState = { ...state };
      break;
    }
  }

  return newState;
};
