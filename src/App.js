import React from "react";
import Header from "./components/header/Header.component";
import Footer from "./components/footer/Footer.component";
import Dashboard from "./components/dashboard/Dashboard.component";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import SignInComponent from "./components/auth/SignIn.component";
import { spinnerSelector, uidSelector } from "./redux/selectors";
import Spinner from "./components/spinner/Spinner.component";
import CreateList from "./components/createList/CreateList.component";
import PendingList from "./components/pendingList/PendingList.component";
import HistoryList from "components/history/HistoryList.component";

const App = ({ showSpinner, uid }) => {
  return (
    <BrowserRouter>
      {!uid && <Redirect to="/login" />}
      {showSpinner && <Spinner />}
      <Header />
      <Switch>
        <Route path="/login" component={SignInComponent} />
        <Route exact path="/" component={Dashboard} />
        <Route path="/createList" component={CreateList} />
        <Route path="/pending" component={PendingList} />
        <Route path="/history" component={HistoryList} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    uid: uidSelector(state),
    showSpinner: spinnerSelector(state),
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "categoriesList" }])
)(App);
