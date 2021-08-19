import { IReview } from "../types";
import { Box, Button, useMediaQuery } from "@chakra-ui/react";
import { white, sapphire, black, bedrock } from "../styles/palette";
import Text from "./Text";

interface IReplyCardProps {
  review: IReview;
  isEditing: boolean;
  setIsEditing: Function;
}

const ReplyCard = ({
  review,
  isEditing,
  setIsEditing,
}: IReplyCardProps): JSX.Element => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px");
  return (
    <Box
      d="flex"
      width="100%"
      flexDirection="column"
      backgroundColor={white}
      maxWidth="600px"
      margin="auto"
    >
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
          onClick={() => setIsEditing(() => true)}
        >
          Edit Reply
        </Button>
      </Box>
    </Box>
  );
};

export default ReplyCard;
