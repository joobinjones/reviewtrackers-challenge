import Context from "../context";
import { useContext } from "react";
import { IContext, IReview } from "../types";
import ReviewItem from "../components/ReviewItem";
import "../styles/ListReviews.css";

const ListReviews = (): JSX.Element => {
  const context: IContext = useContext(Context);
  return (
    <div id="list-container">
      {context.state.data?.map((ele: IReview, idx: number) => (
        <div className="review-item" key={idx}>
          <ReviewItem review={ele} />
        </div>
      ))}
    </div>
  );
};

export default ListReviews;
