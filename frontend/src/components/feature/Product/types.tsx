export interface IUser {
  _id: string;
  fullName: string;
}

export interface IProductImages {
  name: string;
  url: string;
}

export interface IProductReviews {
  id: string;
  rating: number;
  title: string;
  comment: string;
  user: IUser;
}

export interface IProduct {
  id: string;
  _id: number;
  averageRating: number;
  category: string;
  colors: string[];
  company: string;
  description: string;
  featured: boolean;
  freeShipping: boolean;
  images: IProductImages[];
  inventory: number;
  name: string;
  numOfReviews: number;
  price: number;
  reviews: IProductReviews[];
}

export interface IProductListResponse {
  data: {
    products: IProduct[];
  };
}

export interface IProductItemProps {
  product: IProduct;
}

export interface IProductDetailResponse {
  data: IProductItemProps;
}
