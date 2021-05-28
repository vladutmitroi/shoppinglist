import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signInAction } from "redux/actions/authActions";
import { uidSelector, errorMessageSelector } from "redux/selectors";
import { SubmitForm, showSpinner } from "components/common/commonComponents";

const SignIn = ({ uid, signIn, setShowSpinner, errorMessage }) => {
  const [state, setState] = useState({ email: "", password: "" });

  const handleOnInputChange = ({ target: { value, name } }) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSpinner();
    signIn(state.email, state.password);
  };

  const formState = { ...state };

  if (uid) return <Redirect to="/" />;

  return (
    <div className="container sign-in-form">
      <SubmitForm
        {...{
          handleSubmit,
          formState,
          handleOnInputChange,
          errorMessage,
          buttonProps: {
            submitButtonLayoutClass: "s12 m8",
            submitButtonText: "Sign in",
          },
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    uid: uidSelector(state),
    errorMessage: errorMessageSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (email, password) => dispatch(signInAction(email, password)),
    setShowSpinner: () => showSpinner(dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
