/* eslint-disable react-hooks/exhaustive-deps */
import { useRouteMatch } from "react-router-dom";
import { Box } from "@chakra-ui/layout";
import ReviewItem from "./ReviewItem";
import Context from "../context";
import { useContext, useState, useEffect } from "react";
import { IReview, IContext } from "../types";
import AddEditReply from "./AddEditReply";
import ReplyCard from "./ReplyCard";

const ReviewDetails = (): JSX.Element => {
  const {
    params: { reviewId },
  } = useRouteMatch<any>();
  const { state, setState }: IContext = useContext(Context);
  const [review, setReview] = useState<IReview>({
    id: "",
    author: "",
    place: "",
    published_at: "",
    rating: 0,
    content: "",
    reply: null,
  });
  const [editClicked, setEditClicked] = useState<boolean>(false);
  useEffect(() => {
    const foundReview = state.data?.find((ele) => ele.id === reviewId);
    setReview(() => ({ ...review, ...foundReview }));
  }, [state, setState]);
  return (
    <Box>
      <ReviewItem data={review} />
      {review.reply ? (
        <ReplyCard
          data={review}
          editClicked={editClicked}
          setEditClicked={setEditClicked}
        />
      ) : (
        <AddEditReply data={review} />
      )}
    </Box>
  );
};

export default ReviewDetails;
