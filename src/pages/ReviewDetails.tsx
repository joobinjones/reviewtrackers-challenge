/* eslint-disable react-hooks/exhaustive-deps */
import { useRouteMatch } from "react-router-dom";
import { Box } from "@chakra-ui/layout";
import ReviewItem from "../components/ReviewItem";
import Context from "../context";
import { useContext, useState, useEffect } from "react";
import { IReview, IContext } from "../types";
import AddEditReply from "../components/AddEditReply";
import ReplyCard from "../components/ReplyCard";

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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  useEffect(() => {
    const foundReview = state.data?.find((ele) => ele.id === reviewId);
    setReview(() => ({ ...review, ...foundReview }));
  }, [state, setState]);

  return (
    <Box>
      <ReviewItem review={review} />
      {review.reply && !isEditing ? (
        <ReplyCard
          review={review}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        <AddEditReply
          review={review}
          setReview={setReview}
          setIsEditing={setIsEditing}
        />
      )}
    </Box>
  );
};

export default ReviewDetails;
