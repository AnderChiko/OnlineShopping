export interface IProcessable<T> {
  isLoading: boolean;
  isSaving: boolean;
  data: T;
}

export class Processable<T> implements IProcessable<T> {
  isLoading = false;
  isSaving = false;
  data: T;

  constructor(data: T) {
    this.data = data;

    if (data === undefined) {
    } else if (data === null) {
      this.isLoading = true;
      this.isSaving = true;
    } else {
      this.isLoading = false;
      this.isSaving = false;
    }
  }
}
