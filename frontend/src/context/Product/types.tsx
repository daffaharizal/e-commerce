import { IChildrenProps } from 'types';

export interface IProductContext {
  productId: string;
}

export interface IProductProps extends IChildrenProps, IProductContext {}
