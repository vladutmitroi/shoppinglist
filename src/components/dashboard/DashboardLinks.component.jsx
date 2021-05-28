import React from "react";
import { useHistory } from "react-router-dom";

const DashboardLinks = () => {
  const history = useHistory();
  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <div className="dashboard-links">
      <button
        onClick={() => handleClick("createList", "create list")}
        className="dashboard-links-btn"
      >
        <i className="fas white-color fa-cart-plus d-block v-align-middle"></i>
        <span className="link-text dashboard-links-text m-t-15">
          Create list
        </span>
      </button>
      <button
        onClick={() => handleClick("pending")}
        className="dashboard-links-btn"
      >
        <i className="fas white-color fa-hourglass-half d-block v-align-middle"></i>
        <span className="link-text dashboard-links-text m-t-15">Pending</span>
      </button>
      <button
        onClick={() => handleClick("history")}
        className="dashboard-links-btn"
      >
        <i className="fas white-color fa-history d-block v-align-middle"></i>
        <span className="link-text dashboard-links-text m-t-15">History</span>
      </button>
    </div>
  );
};

export default DashboardLinks;
