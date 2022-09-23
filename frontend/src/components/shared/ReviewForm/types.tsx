import { IProductReviews } from 'components/feature/Product/types';

export interface ISetReviews {
  setReviews?: React.Dispatch<React.SetStateAction<IProductReviews[]>>;
}

export interface IReviewForm {
  product: string;
  rating: number;
  title: string;
  comment: string;
  serverError?: string;
}

export interface IReviewFormResponse {
  data: {
    review: IProductReviews;
  };
}