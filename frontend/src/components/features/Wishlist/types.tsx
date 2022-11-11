import { IProduct } from 'components/features/Product/types';

export type WishlistResponseType = {
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
};
