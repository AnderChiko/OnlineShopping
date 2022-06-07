
export interface IProductFilter {
  name: string | null;
}

export class ProductFilter implements IProductFilter {
  name!: string;
}
