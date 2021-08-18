export interface IReply {
  author: string;
  content: string;
  published_at: string;
}

export interface IReview {
  id: string;
  author: string;
  place: string;
  published_at: string;
  rating: number;
  content: string;
  reply: IReply | null | undefined;
}

export type IReviewArray = Array<IReview>;

export interface IState {
  data: IReviewArray | null;
  user: string;
}

export interface IContext {
  state: IState;
  setState: Function;
}

export interface IReviewItemProps {
  data: IReview;
}

// export interface ITextProps {
//   fontSize: string;
//   ml: string;
//   mr: string;
//   mt: string;
//   mb: string;
//   color: string;
//   data: string;
// }
