/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import ListReviews from "../components/ListReviews";
import ReviewDetails from "../components/ReviewDetails";
import Context from "../context";
import { IState, IContext } from "../types";

const Routes = (): JSX.Element => {
  const [state, setState] = useState<IState>({ data: [] });
  useEffect(() => {
    const getData = async () => {
      try {
        const response: AxiosResponse = await axios.get("reviews.json");
        setState(() => ({ ...state, data: response.data }));
      } catch (err) {
        console.log(err);
      }
    };
    // need to figure out refresh

    if (!state.data?.length) getData();
  }, []);
  const context: IContext = { state, setState };

  return (
    <Router>
      <Switch>
        <Context.Provider value={context}>
          <Route exact path="/">
            <Redirect to={"/reviews"} />
          </Route>
          <Route exact path="/reviews/:reviewId" component={ReviewDetails} />
          <Route exact path="/reviews" component={ListReviews} />
        </Context.Provider>
      </Switch>
    </Router>
  );
};

export default Routes;
