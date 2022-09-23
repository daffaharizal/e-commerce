export interface IUserRatingProps {
  id?: string;
  star?: number;
  numOfReviews?: number;
  disabled?: boolean;
  setRating?: React.Dispatch<React.SetStateAction<number>>;
}
