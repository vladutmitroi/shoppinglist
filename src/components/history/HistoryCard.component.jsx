import React from "react";

export const HistoryCard = ({
  field: { total, location, submittedAt } = {},
}) => {
  return (
    <div className="history-page-list--card">
      <li>{submittedAt}</li>
      <li className="text-center">{location.toUpperCase()}</li>
      <li className="text-right">{total} RON</li>
    </div>
  );
};
