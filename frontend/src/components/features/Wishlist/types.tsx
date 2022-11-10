import { IProduct } from 'components/features/Product/types';

export interface WishlistResponseType {
  wishlist: {
    folders: [
      {
        id: string;
        name: string;
        items: [
          {
            product: IProduct;
          }
        ];
      }
    ];
  };
}
