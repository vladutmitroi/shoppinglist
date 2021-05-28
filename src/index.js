import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/style/index.scss";

import { Provider, useSelector } from "react-redux";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";
import firebase from "firebase/app";
import { store } from "./redux/store";
import Spinner from "./components/spinner/Spinner.component";

const rrfProps = {
  firebase,
  dispatch: store.dispatch,
  createFirestoreInstance,
  config: {},
};

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <Spinner />;
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
