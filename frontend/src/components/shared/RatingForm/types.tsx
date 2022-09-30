export interface IUserRatingProps {
  id?: string;
  star?: number;
  numOfReviews?: number;
  showNumOfReviews?: boolean;
  disabled?: boolean;
  setRating?: React.Dispatch<React.SetStateAction<number>>;
}
