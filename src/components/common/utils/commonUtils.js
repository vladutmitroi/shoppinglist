import { dispatchStoreAction } from "redux/actions/dispatchStoreAction";

const setSelectedCategory = (activeCategory = {}, defaultCategory = {}) => {
  return {
    ...(Object.keys(activeCategory).length ? activeCategory : defaultCategory),
  };
};

const showSpinner = (dispatch) => {
  return dispatch(dispatchStoreAction("SHOW_SPINNER", true));
};

const sortListByProducts = (list = []) => {
  return list.slice().sort((a, b) => b.products.length - a.products.length);
};

export { setSelectedCategory, showSpinner, sortListByProducts };
