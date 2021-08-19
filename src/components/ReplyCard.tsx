import { IReview } from "../types";
import { Box, Button } from "@chakra-ui/react";
import { white, sapphire, black, bedrock } from "../styles/palette";
import Text from "./Text";

interface IReplyCardProps {
  review: IReview;
  editClicked: boolean;
  setEditClicked: Function;
}

const ReplyCard = ({
  review,
  editClicked,
  setEditClicked,
}: IReplyCardProps): JSX.Element => {
  console.log(editClicked);
  return (
    <Box d="flex" flexDirection="column" backgroundColor={white}>
      <Text
        mt="25px"
        ml="10px"
        mb="20px"
        fontSize="14px"
        color={bedrock}
        data={review.reply?.content}
      />
      <Box
        ml="10"
        d="flex"
        flexDirection="row"
        justifyContent="space-between"
        mb="25"
        mr="10"
      >
        <Text color={black} fontSize="12px" data={review.reply?.author} />
        <Text color={bedrock} fontSize="12px" data={review.reply?.published_at} />
        <Button
          backgroundColor={sapphire}
          color={white}
          border={`1px ${sapphire} ${black}`}
          borderRadius="5px"
          width="100px"
          onClick={() => setEditClicked(() => true)}
        >
          Edit Reply
        </Button>
      </Box>
    </Box>
  );
};

export default ReplyCard;
