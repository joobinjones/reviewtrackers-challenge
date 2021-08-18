import { IReview } from "../types";

interface IReplyCardProps {
  data: IReview;
  editClicked: boolean;
  setEditClicked: Function;
}

const ReplyCard = ({
  data,
  editClicked,
  setEditClicked,
}: IReplyCardProps): JSX.Element => {
  return <div></div>;
};

export default ReplyCard;
