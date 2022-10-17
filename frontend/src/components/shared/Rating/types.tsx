export interface IUserRatingProps {
  rate?: number;
  emoji?: boolean;
  readonly?: boolean;
  setRating?: React.Dispatch<React.SetStateAction<number>>;
}
