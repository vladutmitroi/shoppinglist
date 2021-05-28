import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  updatePendingListWithProduct as updatePendingListAction,
  deleteCategoryFromPendingList as deletePendingListAction,
} from "redux/actions/shoppingListsActions";
import { pendingListSelector } from "redux/selectors";

import {
  Muffin,
  ProductsCard,
  setSelectedCategory,
  sortListByProducts,
} from "components/common/commonComponents";
import CategoryAddProduct from "./CategoryAddProduct.component";

const CategoryCard = ({
  updatePendingListWithProduct,
  deleteCategoryFromPendingList,
  category: { id, name, products = [] } = {},
  pendingList = [],
}) => {
  let currentPendingListItem = {};
  if (pendingList.length) {
    currentPendingListItem =
      pendingList.find((item) => item.name === name) || [];
  }
  const { id: pendingListId } = currentPendingListItem || {};

  const checkProductInPendingList = (product) => {
    const { products = [] } = currentPendingListItem || {};
    return products.find((p) => p.name === product);
  };

  const handleClick = (product, productInPendingList) => {
    const { products = [] } = currentPendingListItem;
    const isLastProduct = productInPendingList && products.length === 1;
    if (isLastProduct) deleteCategoryFromPendingList(pendingListId);
    else {
      updatePendingListWithProduct({
        name,
        pendingListId,
        actionType: productInPendingList ? "delete" : "add",
        product,
      });
    }
  };

  const renderProducts = () => {
    return products
      .slice()
      .sort((a, b) => a.localeCompare(b))
      .map((product, idx) => {
        const productInPendingList = checkProductInPendingList(product);
        return (
          <li
            className={`category-card--products-item ${
              productInPendingList ? "added" : ""
            }`}
            key={`${idx}_${product}`}
          >
            {product}
            <i
              onClick={() => handleClick(product, productInPendingList)}
              className="fas right"
            />
          </li>
        );
      });
  };

  if (!products.length) return <Muffin />;
  return (
    <>
      <ProductsCard
        cardClassName="category-card"
        title={name}
        renderProducts={renderProducts}
      />
      <CategoryAddProduct categoryId={id} />
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    categories: { activeCategory = {} } = {},
    firestore: { ordered: { categoriesList = [] } = {} } = {},
  } = state;
  const sortedCategories = sortListByProducts(categoriesList);

  const category = setSelectedCategory(activeCategory, sortedCategories[0]);

  return {
    category,
    pendingList: pendingListSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePendingListWithProduct: (payload) =>
      dispatch(updatePendingListAction(payload)),
    deleteCategoryFromPendingList: (payload) =>
      dispatch(deletePendingListAction(payload)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "categoriesList" }])
)(CategoryCard);
