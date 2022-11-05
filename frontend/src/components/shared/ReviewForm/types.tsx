import { IProductReviews } from 'components/features/Product/types';

export interface ISetReviews {
  reviewItem: string;
  setReviews: React.Dispatch<React.SetStateAction<IProductReviews[]>>;
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
