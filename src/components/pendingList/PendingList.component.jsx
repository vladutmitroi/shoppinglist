import React, { useState, useEffect, useRef } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  pendingListSelector,
  errorMessageSelector,
  listSubmittedSelector,
} from "redux/selectors";
import { submitPendingList } from "redux/actions/shoppingListsActions";
import PendingCard from "./PendingCard.component";
import {
  SubmitForm,
  Muffin,
  sortListByProducts,
  showSpinner,
} from "components/common/commonComponents";

const PendingList = ({
  setShowSpinner,
  submitPendingList,
  pendingList = [],
  errorMessage,
  listSubmitted,
  history,
}) => {
  const [state, setState] = useState({ location: "", total: "" });
  const prevListSubmitted = useRef(listSubmitted);

  useEffect(() => {
    if (listSubmitted && listSubmitted !== prevListSubmitted.current) {
      history.push("/history");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listSubmitted]);

  const handleOnInputChange = ({ target: { value, name } }) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    const { total, location } = state;
    e.preventDefault();
    setShowSpinner();
    submitPendingList({ total, location, pendingList });
  };

  const formState = { ...state };

  const sortedProducts =
    (!!pendingList.length && sortListByProducts(pendingList)) || [];

  return (
    <div className="pending-list-page main-container container">
      {!pendingList.length && <Muffin />}
      {!!sortedProducts.length && [
        sortedProducts.map((item, idx) => (
          <PendingCard key={`${item.name}_${idx}`} item={item} />
        )),
        <div key="submit-form" className="submit-pending-list-form">
          <SubmitForm
            {...{
              handleSubmit,
              formState,
              handleOnInputChange,
              errorMessage,
              buttonProps: {
                submitButtonLayoutClass: "s12 m4",
                submitButtonText: "Shopping`s done !",
              },
            }}
          />
        </div>,
      ]}
    </div>
  );
};

const mapStateToProps = (state) => ({
  pendingList: pendingListSelector(state) || {},
  errorMessage: errorMessageSelector(state),
  listSubmitted: listSubmittedSelector(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    submitPendingList: (payload) => dispatch(submitPendingList(payload)),
    setShowSpinner: () => showSpinner(dispatch),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "pendingList" }])
)(PendingList);
