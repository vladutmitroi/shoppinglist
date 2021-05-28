export const dispatchStoreAction = (type, payload) => {
  return (dispatch) => {
    dispatch({
      type,
      payload,
    });
  };
};
