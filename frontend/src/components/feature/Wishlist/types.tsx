export interface IWishListResponse {
  wishlist: {
    folders: [
      {
        id: string;
        name: string;
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
