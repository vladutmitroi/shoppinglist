export const updatePendingListWithProduct = ({
  name,
  product,
  pendingListId,
  actionType,
  quantity,
}) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const pendingListRef = firestore.collection("pendingList");
    const pendingListRefDoc = pendingListRef.doc(pendingListId);
    const addProductAction = actionType && actionType === "add";

    pendingListRefDoc
      .get()
      .then((doc) => {
        if (doc.exists) {
          const { products = [] } = doc.data();
          const filteredProducts = products.filter((p) => p.name !== product);
          const productToAdd = { name: product, checked: false };

          pendingListRefDoc.update({
            products: addProductAction
              ? [...products, productToAdd]
              : [...filteredProducts],
          });
        } else if (addProductAction) {
          pendingListRef.add({
            name,
            products: [{ name: product, checked: false }],
          });
        }
        dispatch({ type: "PRODUCT_ADDED_TO_PENDING_LIST" });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR_UPDATING_PENDING_LIST",
          payload: error.message,
        });
      });
  };
};

export const deleteCategoryFromPendingList = (id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const pendingListRef = firestore.collection("pendingList");
    const pendingListRefDoc = pendingListRef.doc(id);
    pendingListRefDoc
      .delete()
      .then((resp) => {
        dispatch({
          type: "DELETE_CATEGORY_SUCCESS",
          payload: resp,
        });
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_CATEGORY_ERROR",
          payload: err.message,
        });
      });
  };
};

export const setProductChecked = ({ id, product, checked }) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const checkedProductsRef = firestore.collection("pendingList");
    const checkedProductsRefDoc = checkedProductsRef.doc(id);

    checkedProductsRefDoc
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const { products = [] } = data;
          const matchedIndex = products.findIndex((p) => p.name === product);

          if (matchedIndex || matchedIndex === 0) {
            products[matchedIndex].checked = checked;
            checkedProductsRefDoc.update({
              products,
            });
          }
        }
        dispatch({ type: "PRODUCT_CHECKED_PENDING_LIST" });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR_UPDATING_PENDING_LIST",
          payload: error.message,
        });
      });
  };
};

export const submitPendingList = ({ total, location, pendingList = [] }) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    const pendingListRef = firestore.collection("pendingList");
    let listSubmitted = false;

    await firestore
      .collection("historyList")
      .add({
        date: new Date(),
        submittedAt: `${day}-${month + 1}-${year}`,
        total,
        location,
      })
      .then(() => {
        listSubmitted = true;
        dispatch({ type: "PENDING_LIST_SUBMITTED" });
      })
      .catch((err) => {
        dispatch({
          type: "PENDING_LIST_SUBMITTED_ERROR",
          payload: err.message,
        });
      });

    if (listSubmitted) {
      pendingList.forEach((item) => {
        const doc = pendingListRef.doc(item.id);
        doc
          .delete()
          .then(() => dispatch({ type: "PENDING_ITEM_DELETED" }))
          .catch((err) =>
            dispatch({
              type: "PENDING_ITEM_DELETE_ERROR",
              payload: err.message,
            })
          );
      });
    }
  };
};
