import { Formik, Form, Field } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { IReview } from "../types";
import { white, sapphire, black } from "../styles/palette";

interface IAddEditReplyProps {
  data: IReview;
}

const AddEditReply = ({ data }: IAddEditReplyProps): JSX.Element => {
  return (
    <Box mt="20" mb="20" backgroundColor={white} d="flex" flexDirection="column">
      <Box mt="10" ml="10">
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="reply">Replying as Jane Appleseed...</label>
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
                  borderRadius: "2px",
                  width: "100px",
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
