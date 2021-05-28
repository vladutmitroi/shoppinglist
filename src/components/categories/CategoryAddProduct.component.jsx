import React, { useState } from "react";
import { connect } from "react-redux";
import { SubmitForm, showSpinner } from "components/common/commonComponents";
import { errorMessageSelector } from "redux/selectors";
import { addProductToCategoryAction } from "redux/actions/categoryActions";

const CategoryAddProduct = ({
  categoryId,
  errorMessage,
  addProductToCategory,
  setShowSpinner,
}) => {
  const [state, setState] = useState({ addProduct: "" });

  const handleOnInputChange = ({ target: { value } }) => {
    setState({ addProduct: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProductToCategory(state.addProduct, categoryId);
    setShowSpinner();
    setState({ addProduct: "" });
  };

  return (
    <div className="add-product-form">
      <div className="add-product-form--wrap">
        <label
          className="uppercase add-product-form--title"
          htmlFor="addProduct"
        >
          add a missing product
          <i className="fas fa-puzzle-piece"></i>
        </label>
        <SubmitForm
          {...{
            handleOnInputChange,
            handleSubmit,
            buttonProps: {
              submitButtonLayoutClass: "s12 m4",
              submitButtonText: "add",
            },
            errorMessage,
            formState: { ...state },
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  errorMessage: errorMessageSelector(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCategory: (product, categoryId) =>
      dispatch(addProductToCategoryAction(product, categoryId)),
    setShowSpinner: () => showSpinner(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAddProduct);
