import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import { categoriesReducer } from "./categoriesReducer";
import { commonReducer } from "./commonReducer";

export const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  categories: categoriesReducer,
  common: commonReducer,
});
