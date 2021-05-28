import React from "react";
import { getCategoryIcon } from "components/categories/getCategoryIcon";

export const ProductsCard = ({
  isPendingPage,
  cardClassName = "",
  renderProducts,
  title,
}) => {
  let categoryClass, icon;
  if (isPendingPage) {
    categoryClass = title.replace(/[ , &]+/g, "-");
    icon = getCategoryIcon(categoryClass);
  }

  return (
    <div className={cardClassName}>
      {title && (
        <h4 className={`${cardClassName}--name category-title uppercase`}>
          {title}{" "}
          {!!icon && <i className={`fas category-title-icon ${icon}`} />}
        </h4>
      )}
      <ul className={`${cardClassName}--products`}>{renderProducts()}</ul>
    </div>
  );
};
