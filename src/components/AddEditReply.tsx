import { Formik, Form, Field } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { IReview, IReviewArray, IContext } from "../types";
import { white, sapphire, black } from "../styles/palette";
import Context from "../context";
import { useContext } from "react";
import { formatDate } from "../util";

interface IAddEditReplyProps {
  data: IReview;
}

const AddEditReply = ({ data }: IAddEditReplyProps): JSX.Element => {
  const { state, setState }: IContext = useContext(Context);

  const handleSubmit = (values: { reply: string }): void => {
    const reviewsArr: IReviewArray = [];
    // copy state array
    state.data?.forEach((ele) => reviewsArr.push(Object.assign({}, ele)));
    const foundReview = reviewsArr.find((ele) => ele.id === data.id);
    if (foundReview)
      foundReview.reply = {
        author: state.user,
        content: values.reply,
        published_at: formatDate(new Date()),
      };
    setState(() => ({
      ...state,
      data: reviewsArr,
    }));
  };

  return (
    <Box mt="20" mb="20" backgroundColor={white} d="flex" flexDirection="column">
      <Box mt="10" ml="10">
        <Formik initialValues={{ reply: "" }} onSubmit={handleSubmit}>
          <Form style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="reply">Replying as {state.user}...</label>
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
                data.reply?.content ? data.reply.content : "Thanks for the review!"
              }
            />
            <Box d="flex" justifyContent="flex-end">
              <Button
                type="submit"
                style={{
                  backgroundColor: sapphire,
                  color: white,
                  marginTop: "5px",
                  marginRight: "10px",
                  marginBottom: "5px",
                  border: `1px solid ${black}`,
                  borderRadius: "5px",
                  width: "75px",
                }}
              >
                Submit
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default AddEditReply;
