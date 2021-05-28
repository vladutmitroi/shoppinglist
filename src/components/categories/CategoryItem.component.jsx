import React from "react";
import { connect } from "react-redux";
import { dispatchStoreAction } from "redux/actions/dispatchStoreAction";
import { getCategoryIcon } from "./getCategoryIcon";
const actionName = "SET_ACTIVE_CATEGORY";

const CategoryItem = ({
  category = {},
  setActiveCategory,
  selectedCategory,
}) => {
  const categoryClass = category.name.replace(/[ , &]+/g, "-");
  const activeClass = selectedCategory.name === category.name ? " active" : "";
  return (
    <>
      <button
        className={`category-list--btn ${categoryClass + activeClass}`}
        onClick={() => setActiveCategory(actionName, category)}
      >
        <i className={`fas ${getCategoryIcon(categoryClass)}`}></i>
      </button>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveCategory: (actionName, category) =>
      dispatch(dispatchStoreAction(actionName, category)),
  };
};

export default connect(null, mapDispatchToProps)(CategoryItem);
