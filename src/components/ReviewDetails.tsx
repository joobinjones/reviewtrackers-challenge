/* eslint-disable react-hooks/exhaustive-deps */
import { useRouteMatch } from "react-router-dom";
import { Box } from "@chakra-ui/layout";
import ReviewItem from "./ReviewItem";
import Context from "../context";
import { useContext, useState, useEffect } from "react";
import { IReview, IContext } from "../types";

const ReviewDetails = (): JSX.Element => {
  const {
    params: { reviewId },
  } = useRouteMatch<any>();
  const context: IContext = useContext(Context);
  const [review, setReview] = useState<IReview>({
    id: "",
    author: "",
    place: "",
    published_at: "",
    rating: 0,
    content: "",
    reply: null,
  });
  useEffect(() => {
    const foundReview = context.state.data?.find((ele) => ele.id === reviewId);
    setReview(() => ({ ...review, ...foundReview }));
  }, []);
  return (
    <Box>
      <ReviewItem data={review} />
    </Box>
  );
};

export default ReviewDetails;
