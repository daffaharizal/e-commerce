export interface IUserRatingProps {
  id?: string;
  star?: number;
  totalReviews?: number;
  disabled?: boolean;
  setRating?: React.Dispatch<React.SetStateAction<number>>;
}
