import React from "react";
import CategoryCard from "components/categories/CategoryCard.component";
import CategoryList from "components/categories/CategoryList.component";

const CreateList = () => {
  return (
    <div className="main-container container create-list-page">
      <CategoryList />
      <CategoryCard />
    </div>
  );
};

export default CreateList;
