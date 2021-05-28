import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { historyListSelector } from "redux/selectors";
import { HistoryCard } from "./HistoryCard.component";
import { Muffin } from "components/common/commonComponents";

const HistoryList = ({ historyList = [] }) => {
  const total = historyList.reduce((total, curr) => {
    return total + parseInt(curr.total);
  }, 0);

  return (
    <div className="history-page main-container container">
      {!historyList.length && <Muffin />}
      {!!historyList.length && (
        <div className="history-page-list">
          <div className="history-page-list--headings">
            <h3>date</h3>
            <h3 className="text-center">location</h3>
            <h3 className="text-right">total</h3>
          </div>
          {historyList.map((field, idx) => {
            return <HistoryCard key={`${idx}_${field.date}`} field={field} />;
          })}
          <div className="right total">
            <i className="fas fa-coins p-r-15" />
            {total}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  historyList: historyListSelector(state),
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "historyList", orderBy: ["date", "desc"] }])
)(HistoryList);
