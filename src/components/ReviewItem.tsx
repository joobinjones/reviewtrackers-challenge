import { Box } from "@chakra-ui/react";
import { useRouteMatch } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import { IReviewItemProps } from "../types";
import { jonquil, manatee, white, bedrock } from "../styles/palette";
import Text from "./Text";
import { ListLinks } from "./ReviewLinks";
import AddEditResponse from "./AddEditResponse";

const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}/${year}`;
};

const ReviewItem = ({ data }: IReviewItemProps): JSX.Element => {
  const {
    params: { reviewId },
  } = useRouteMatch<any>();

  return (
    <>
      <Box mt="20" mb="20" backgroundColor={white} d="flex" flexDirection="column">
        <Box ml="10" mr="10">
          <Box mt="15">
            <Text fontSize="20px" data={data.place} fontWeight={800} />
          </Box>
          <Box mt="5" ml="3">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon key={i} color={i < data.rating ? jonquil : manatee} />
              ))}
          </Box>
          <Box>
            <Text
              fontSize="14px"
              data={
                reviewId
                  ? data.content
                  : data.content.length < 76
                  ? data.content
                  : `${data.content.substring(0, 75)}...`
              }
              color={bedrock}
              mt="20px"
            />
          </Box>
          <Box mt="50" mb="15" d="flex" justifyContent="space-between">
            <Text fontSize="12px" data={data.author} />
            <Text
              fontSize="12px"
              ml="15px"
              data={formatDate(data.published_at)}
              color={bedrock}
            />
            {!reviewId && <ListLinks data={data} />}
          </Box>
        </Box>
      </Box>
      {reviewId && <AddEditResponse data={data} />}
    </>
  );
};

export default ReviewItem;
