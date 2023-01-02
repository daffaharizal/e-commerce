export type IUser = {
  _id: string;
  fullName: string;
};

export type IProductImages = {
  name: string;
  url: string;
  isPublicUrl: boolean;
};

export type IProductReviews = {
  id: string;
  rating: number;
  title: string;
  comment: string;
  user: IUser;
};

export type SkuType = {
  id: string;
  name: string;
  price: number;
  stock: number;
  features: string[];
  varients: [{ name: string; _id: string }];
  images: IProductImages[];
};

export type IProduct = {
  id: string;
  name: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  skuType: string;
  skus: SkuType[];
  featured: boolean;
  freeShipping: boolean;
  averageRating: number;
  numOfReviews: number;
  reviews: IProductReviews[];
};

export interface IProductsResponse {
  products: IProduct[];
  paging: {
    hasMore: boolean;
    currentPage: number;
    totalPages: number;
    currentItems: number;
    totalItems: number;
  };
}

export interface IProductResponse {
  product: IProduct;
}

export type HandleAddToCartType = {
  product: IProduct;
  sku: SkuType;
  varient?: { _id: string; name: string };
};

export interface ProductCardPropsType {
  product: IProduct;
  sku: SkuType;
  serverUrl: string;
  handleAddToCart: ({ product, sku, varient }: HandleAddToCartType) => void;
}

export type ProductReviewsResponseTypes = {
  paging: {
    hasMore: boolean;
    currentPage: number;
    totalPages: number;
    currentItems: number;
    totalItems: number;
  };
  reviews: IProductReviews[];
};
