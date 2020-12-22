import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Header from "Components/Header";
import Home from "Routes/Home";
import TV from "Routes/TV";
import Search from "Routes/Search";
// import Detail from "Routes/Detail";
import DetailHook from "../Routes/DetailHook";
// import ShowDetail from "../Routes/ShowDetail";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" exact component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={DetailHook} />
        <Route path="/tv/:id" component={DetailHook} />
        {/* <Route path="/movie/:id" component={Detail} />
        <Route path="/tv/:id" component={Detail} /> */}
        {/* <Route path="/detail" component={DetailHook} /> */}
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
