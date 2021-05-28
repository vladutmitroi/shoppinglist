import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import CategoryItem from "./CategoryItem.component";
import {
  setSelectedCategory,
  sortListByProducts,
} from "components/common/commonComponents";

const CategoryList = ({ sortedCategories, selectedCategory }) => {
  const items = sortedCategories.map((category) => (
    <CategoryItem key={category.id} {...{ category, selectedCategory }} />
  ));

  return <div className="category-list">{items}</div>;
};

const mapStateToProps = ({
  categories: { activeCategory = {} } = {},
  firestore: { ordered: { categoriesList = [] } = {} } = {},
}) => {
  const sortedCategories = sortListByProducts(categoriesList);

  const selectedCategory = setSelectedCategory(
    activeCategory,
    sortedCategories[0]
  );

  return {
    sortedCategories,
    selectedCategory,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "categoriesList" },
    { collection: "pendingList" },
  ])
)(CategoryList);
