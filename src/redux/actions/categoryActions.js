export const addProductToCategoryAction = (product, categoryId) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const categoriesListRef = firestore.collection("categoriesList");
    categoriesListRef
      .doc(categoryId)
      .update({
        products: firestore.FieldValue.arrayUnion(product),
      })
      .then((resp) =>
        dispatch({ type: "PRODUCT_ADDED_TO_CATEGORY", payload: resp })
      )
      .catch((err) =>
        dispatch({ type: "PRODUCT_NOT_ADDED_TO_CATEGORY", payloa: err.message })
      );
  };
};
