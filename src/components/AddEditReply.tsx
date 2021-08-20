import { Formik, Form, Field } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { IReview, IReviewArray, IContext } from "../types";
import { white, sapphire, bedrock } from "../styles/palette";
import Text from "./Text";
import Context from "../context";
import { useContext } from "react";
import { formatDate } from "../util";
import { updateDoc } from "firebase/firestore";
import { reviewsRef } from "../api";
interface IAddEditReplyProps {
  review: IReview;
  setReview: Function;
  setIsEditing: Function;
}

const AddEditReply = ({
  review,
  setReview,
  setIsEditing,
}: IAddEditReplyProps): JSX.Element => {
  const { state, setState }: IContext = useContext(Context);

  const handleSubmit = (values: { reply: string }): void => {
    const reviewsArr: IReviewArray = [];
    // copy state array
    state.data?.forEach((ele) => reviewsArr.push(Object.assign({}, ele)));
    const foundReview = reviewsArr.find((ele) => ele.id === review.id);
    if (foundReview)
      foundReview.reply = {
        author: state.user,
        content: values.reply,
        published_at: formatDate(new Date()),
      };
    updateDoc(reviewsRef, { reviews: reviewsArr });
    setState(() => ({
      ...state,
      data: reviewsArr,
    }));
    setReview(() => foundReview);
    setIsEditing(() => false);
  };

  return (
    <Box
      mt="20"
      mb="20"
      backgroundColor={white}
      d="flex"
      flexDirection="column"
      width="100%"
      maxWidth="600px"
      margin="auto"
    >
      <Box mt="10" ml="10">
        <Formik
          initialValues={{ reply: review.reply ? review.reply.content : "" }}
          onSubmit={handleSubmit}
        >
          <Form style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="reply">
              <Text fontSize="14px" data={`Replying as ${state.user}...`} />
            </label>
            <Field
              style={{
                marginTop: "10px",
                marginRight: "10px",
                fontFamily: "Lucida Sans",
              }}
              component="textarea"
              id="reply"
              name="reply"
              placeholder={
                review.reply?.content
                  ? review.reply.content
                  : "Thanks for the review!"
              }
            />
            <Box
              d="flex"
              marginRight="10px"
              marginBottom="5px"
              marginTop="5px"
              justifyContent="flex-end"
            >
              <Button
                type="submit"
                backgroundColor={sapphire}
                color={white}
                border={`1px solid ${sapphire}`}
                borderRadius="5px"
                width="75px"
              >
                Submit
              </Button>
              {review.reply && (
                <Button
                  onClick={() => setIsEditing(() => false)}
                  backgroundColor={bedrock}
                  color={white}
                  border={`1px solid ${bedrock}`}
                  borderRadius="5px"
                  width="75px"
                  ml="5"
                  type="button"
                >
                  Cancel
                </Button>
              )}
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default AddEditReply;
