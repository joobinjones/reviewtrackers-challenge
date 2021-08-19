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

  const Form = () => (
    <AddEditReply
      review={review}
      setReview={setReview}
      editClicked={editClicked}
      setEditClicked={setEditClicked}
    />
  );
  const Card = () => (
    <ReplyCard
      review={review}
      editClicked={editClicked}
      setEditClicked={setEditClicked}
    />
  );

  let RenderReply;
  switch (true) {
    case review.reply && editClicked: {
      RenderReply = Form();
      break;
    }
    case review.reply && !editClicked: {
      RenderReply = Card();
      break;
    }
    case !review.reply: {
      RenderReply = Form();
      break;
    }
  }

  return (
    <Box>
      <ReviewItem review={review} />
      {RenderReply}
    </Box>
  );
};

export default ReviewDetails;
