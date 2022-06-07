

export class ListProps<T> implements IListProps<T>{
  page!: number;
  count!: number;
  filter!: T;
  sortBy!: string[];

  constructor(page?: number, count?: number, filter?: T, sortBy?: string[]) {
    page = page;
    count = count;
    filter = filter;
    sortBy = sortBy;
  }
}

export interface IListProps<T> {
  page: number;
  count: number;
  filter: T;
  sortBy: string[];
}

export interface IListOptionsProps {
  page: number;
  count: number;
}

export class ListOptionsProps implements IListOptionsProps {
  page!: number;
  count = 1000;
}
