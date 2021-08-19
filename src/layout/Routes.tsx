/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import ListReviews from "../pages/ListReviews";
import ReviewDetails from "../pages/ReviewDetails";
import Context from "../context";
import { IState, IContext } from "../types";
import { getDoc } from "firebase/firestore";
import { reviewsRef } from "../api";

const Routes = (): JSX.Element => {
  const [state, setState] = useState<IState>({ data: [], user: "Jane Appleseed" });
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getDoc(reviewsRef);
        setState(() => ({ ...state, data: response.data()?.reviews }));
      } catch (err) {
        console.log(err);
      }
    };
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
