export interface iProductImages {
  name: string;
  url: string;
}

export interface iProduct {
  id: string;
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
