import { IProduct } from 'components/features/Product/types';

export interface IWishListResponse {
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

export interface IWistListAddItemProps {
  folderId: string;
  folderName: string;
  productId: string;
}

export interface IWistListAddItemResponse {
  msg: string;
}
