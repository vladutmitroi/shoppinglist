const initState = {
  errorMessage: "",
  showSpinner: false,
  listSubmitted: false,
};

export const commonReducer = (state = initState, action) => {
  let newState;
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_SUCCESS":
    case "PRODUCT_ADDED_TO_CATEGORY": {
      newState = { ...state, showSpinner: false, errorMessage: null };
      break;
    }
    case "LOGIN_ERROR":
    case "PENDING_LIST_SUBMITTED_ERROR":
    case "PENDING_ITEM_DELETE_ERROR":
    case "DELETE_CATEGORY_ERROR":
      newState = { ...state, errorMessage: payload, showSpinner: false };
      break;
    case "PENDING_LIST_SUBMITTED":
      newState = {
        ...state,
        showSpinner: false,
        listSubmitted: true,
        errorMessage: null,
      };
      break;
    case "PRODUCT_ADDED_TO_PENDING_LIST":
      newState = { ...state, listSubmitted: false, errorMessage: null };
      break;
    case "SHOW_SPINNER":
      newState = { ...state, showSpinner: true };
      break;
    default:
      newState = { ...state };
      break;
  }
  return newState;
};
