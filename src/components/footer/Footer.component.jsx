import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { pendingListSelector } from "redux/selectors";

const pagesWithoutFooter = ["/", "/login"];

const Footer = ({ pendingList = [], history, location: { pathname } = {} }) => {
  const handleClick = (path) => {
    history.push(path);
  };

  if (pathname && pagesWithoutFooter.includes(pathname)) return null;
  return (
    <footer>
      {pathname !== "/" && (
        <button onClick={() => handleClick("/")} className="btn-no-text">
          <i className="fas fa-home d-inline-block v-align-middle"></i>

          <span className="link-text hide-on-med-and-down">Home</span>
        </button>
      )}
      {pathname !== "/createList" && (
        <button
          onClick={() => handleClick("/createList")}
          className="btn-no-text"
        >
          <i className="fas fa-cart-plus d-inline-block v-align-middle"></i>
          <span className="link-text hide-on-med-and-down">Create a list</span>
        </button>
      )}
      {pathname !== "/pending" && (
        <button onClick={() => handleClick("/pending")} className="btn-no-text">
          <i className="fas fa-hourglass-half d-inline-block v-align-middle"></i>
          {!!pendingList.length && (
            <span className="pending-list-notification" />
          )}
          <span className="link-text hide-on-med-and-down">Pending</span>
        </button>
      )}
      {pathname !== "/history" && (
        <button onClick={() => handleClick("/history")} className="btn-no-text">
          <i className="fas fa-history d-inline-block v-align-middle"></i>
          <span className="link-text hide-on-med-and-down">History</span>
        </button>
      )}
    </footer>
  );
};

const mapStateToProps = (state) => ({
  pendingList: pendingListSelector(state) || {},
});

export default withRouter(connect(mapStateToProps)(Footer));
