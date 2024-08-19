import { IProduct } from "./Iprod";

export interface ICart {
  cartID: number;
  customerID: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICartItem {
  cartItemID: number;
  cartID: number;
  product: IProduct;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}
