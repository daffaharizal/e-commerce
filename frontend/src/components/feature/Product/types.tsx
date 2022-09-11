export interface iProduct {
  id: string;
  averageRating: number;
  category: string;
  colors: string[];
  company: string;
  description: string;
  featured: boolean;
  freeShipping: boolean;
  image: string;
  inventory: number;
  name: string;
  numOfReviews: number;
  price: number;
}

export interface iProductResponse {
  data: {
    products: iProduct[];
  };
}

export interface iProductItemProps {
  product: iProduct;
}
