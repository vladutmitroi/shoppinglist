import React from "react";
import Navbar from "./Navbar.component";
import { connect } from "react-redux";
import { uidSelector } from "redux/selectors";

const Header = ({ uid }) => {
  return (
    <header>
      {uid ? (
        <Navbar />
      ) : (
        <h3 className="headline-secondary page-title center-align">Login</h3>
      )}
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    uid: uidSelector(state),
  };
};
export default connect(mapStateToProps)(Header);
