export const signInAction = (email, password) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((resp) => dispatch({ type: "LOGIN_SUCCESS", payload: resp }))
      .catch((err) => dispatch({ type: "LOGIN_ERROR", payload: err.message }));
  };
};

export const signOutAction = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: "SIGNOUT_SUCCESS",
        });
      })
      .catch((err) => {
        dispatch({ type: "SIGNOUT_ERROR", payload: err.message });
      });
  };
};
