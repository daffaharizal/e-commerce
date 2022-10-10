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

export interface IProductListResponse {
  data: {
    products: IProduct[];
  };
}

export interface IProductInfo {
  product: IProduct;
}

export interface IProductItemProps extends IProductInfo {
  serverUrl: string;
  handleAddToCart: (product: IProduct) => void;
}

export interface IProductDetailResponse {
  data: IProductItemProps;
}
