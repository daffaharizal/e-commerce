export interface IUser {
  _id: string;
  fullName: string;
}

export interface IProductImages {
  name: string;
  url: string;
  isPublicUrl: boolean;
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
  name: string;
  category: string;
  company: string;
  description: string;
  colors: string[];
  price: number;
  inventory: number;
  averageRating: number;
  numOfReviews: number;
  images: IProductImages[];
  reviews: IProductReviews[];
  featured: boolean;
  freeShipping: boolean;
}

export interface IProductsResponse {
  products: IProduct[];
}

export interface IProductResponse {
  product: IProduct;
}

export interface IProductItemProps extends IProductResponse {
  serverUrl: string;
  handleAddToCart: (product: IProduct) => void;
}
