export interface iUser {
  _id: string;
  fullName: string;
}

export interface iProductImages {
  name: string;
  url: string;
}

export interface iProductReviews {
  _id: number;
  rating: number;
  title: string;
  comment: string;
  user: iUser;
}

export interface iProduct {
  id: string;
  _id: number;
  averageRating: number;
  category: string;
  colors: string[];
  company: string;
  description: string;
  featured: boolean;
  freeShipping: boolean;
  images: iProductImages[];
  inventory: number;
  name: string;
  numOfReviews: number;
  price: number;
  reviews: iProductReviews[];
}

export interface iProductListResponse {
  data: {
    products: iProduct[];
  };
}

export interface iProductDetailResponse {
  data: {
    product: iProduct;
  };
}

export interface iProductItemProps {
  product: iProduct;
}
