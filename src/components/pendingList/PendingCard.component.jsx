import React from "react";
import { connect } from "react-redux";
import { setProductChecked as setProductCheckedAction } from "redux/actions/shoppingListsActions";
import { ProductsCard } from "components/common/card/ProductsCard.component";

export const PendingCard = ({
  setProductChecked,
  item: { id, name, products = [] },
}) => {
  const renderProducts = () => {
    return products
      .slice()
      .sort((a, b) => a?.name.localeCompare(b?.name))
      .map(({ name, checked }, idx) => {
        return (
          <li
            onClick={() =>
              setProductChecked({ id, product: name, checked: !checked })
            }
            className={`pending-card--products-item ${
              checked ? "checked" : ""
            }`}
            key={`${id}_${idx}`}
          >
            {name}
            <i className="fas fa-check right"></i>
          </li>
        );
      });
  };

  return (
    <ProductsCard
      isPendingPage
      cardClassName="pending-card"
      title={name}
      renderProducts={renderProducts}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProductChecked: (id, product) =>
      dispatch(setProductCheckedAction(id, product)),
  };
};

export default connect(null, mapDispatchToProps)(PendingCard);
