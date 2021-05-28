import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signOutAction } from "redux/actions/authActions";

const Navbar = ({ signOut, location: { pathname } = {} }) => {
  let title = pathname.replace("/", "");
  if (pathname === "/createList") title = "Create list";

  return (
    <React.Fragment>
      <h3 className="headline-secondary page-title center-align">
        {title || "Shoppilist"}
      </h3>
      <button className="sign-out-btn btn-no-text p-r-15" onClick={signOut}>
        <i className="fas fa-sign-out-alt d-inline-block v-align-middle"></i>
        <span className="link-text hide-on-med-and-down p-l-5">Sign out</span>
      </button>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAction()),
});

export default withRouter(connect(null, mapDispatchToProps)(Navbar));
