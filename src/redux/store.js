import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { getFirestore, reduxFirestore } from "redux-firestore";
import fbConfig from "../fbConfig";
import firebase from "firebase/app";
import { getFirebase } from "react-redux-firebase";

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, fbConfig),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
