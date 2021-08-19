import { Box, Button } from "@chakra-ui/react";
import { useRouteMatch, Link } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import { FaReply } from "react-icons/fa";
import { IReviewItemProps } from "../types";
import { jonquil, manatee, white, bedrock } from "../styles/palette";
import Text from "./Text";
import { ListLinks } from "./ReviewLinks";
import { formatDate } from "../util";
import { sapphire } from "../styles/palette";

const ReviewItem = ({ review }: IReviewItemProps): JSX.Element => {
  const {
    params: { reviewId },
  } = useRouteMatch<any>();

  return (
    <>
      <Box mt="20" mb="20" backgroundColor={white} d="flex" flexDirection="column">
        <Box ml="10" mr="10">
          <Box mt="15">
            <Text fontSize="20px" data={review.place} fontWeight={800} />
          </Box>
          <Box mt="5" ml="3">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon key={i} color={i < review.rating ? jonquil : manatee} />
              ))}
          </Box>
          <Box>
            <Text
              fontSize="14px"
              data={
                reviewId
                  ? review.content
                  : review.content.length < 76
                  ? review.content
                  : `${review.content.substring(0, 75)}...`
              }
              color={bedrock}
              mt="20px"
            />
          </Box>
          <Box mt="50" mb="15" d="flex" justifyContent="space-between">
            {reviewId && (
              <Link to="/">
                <Button
                  type="submit"
                  backgroundColor={sapphire}
                  color={white}
                  border={`1px solid ${sapphire}`}
                  borderRadius="5px"
                  width="100px"
                >
                  <FaReply /> <span style={{ marginLeft: "5px" }}>Back to List</span>
                </Button>
              </Link>
            )}
            <Text fontSize="12px" data={review.author} />
            <Text
              fontSize="12px"
              ml="15px"
              data={formatDate(new Date(review.published_at))}
              color={bedrock}
            />
            {review.reply && !reviewId && (
              <Text fontSize="12px" color={bedrock} data={"1 Reply"} />
            )}
            {!reviewId && <ListLinks review={review} />}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ReviewItem;
