import { createSelector } from "reselect";

const sliceSelector = (state) => state;

export const spinnerSelector = createSelector(
  sliceSelector,
  (state) => state.common.showSpinner
);

export const errorMessageSelector = createSelector(
  sliceSelector,
  (state) => state.common.errorMessage
);

export const listSubmittedSelector = createSelector(
  sliceSelector,
  (state) => state.common.listSubmitted
);

export const uidSelector = createSelector(
  sliceSelector,
  (state) => state.firebase.auth.uid
);

export const categoriesListSelector = createSelector(
  sliceSelector,
  (state) => state.firestore.ordered.categoriesList
);

export const activeCategory = createSelector(
  sliceSelector,
  (state) => state.categories.activeCategory
);

export const pendingListSelector = createSelector(
  sliceSelector,
  (state) => state.firestore.ordered.pendingList
);

export const historyListSelector = createSelector(
  sliceSelector,
  (state) => state.firestore.ordered.historyList
);
