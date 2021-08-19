import { FaReply } from "react-icons/fa";
import { SiGooglemessages } from "react-icons/si";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";
import { sapphire } from "../styles/palette";
import { IReviewItemProps } from "../types";

interface IResponseLinkProps {
  reviewId: string;
  Icon: IconType;
}

const ResponseLink = ({ reviewId, Icon }: IResponseLinkProps): JSX.Element => {
  return (
    <Link to={`/reviews/${reviewId}`}>
      <Icon fontSize="16px" color={sapphire} />
    </Link>
  );
};

export const ListLinks = ({ review }: IReviewItemProps): JSX.Element => {
  return review.reply ? (
    <ResponseLink reviewId={review.id} Icon={SiGooglemessages} />
  ) : (
    <ResponseLink reviewId={review.id} Icon={FaReply} />
  );
};
