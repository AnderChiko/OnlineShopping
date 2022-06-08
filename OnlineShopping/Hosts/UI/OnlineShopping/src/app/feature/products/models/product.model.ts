export interface IProduct {
  id?: number;
  name?: string | undefined;
  description?: string | undefined;
  imageUrl?: string | undefined;
  isActive?: boolean;
  isDeleted?: boolean;
  dateCreated?: Date;
}

export class Product implements IProduct {
  id?: number;
  name?: string | undefined;
  description?: string | undefined;
  imageUrl?: string | undefined;
  price: number;
  isActive?: boolean;
  isDeleted?: boolean;
  dateCreated?: Date;
}
