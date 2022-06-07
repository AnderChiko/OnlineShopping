export class ErrorData {
  errorMessage: string;
  errorObject: any;
  action: string;
  result: any;

  constructor(errorObject: any, action: string) {
    this.errorMessage = errorObject.toString();
    this.errorObject = errorObject;
    this.action = action;

    //if (errorObject) {
    //   if (errorObject?.response?.includes('transactionId')) {
    this.result = JSON.parse(errorObject?.response);
    if (this.result?.message === '') {
      this.result.message = this.errorMessage;
    }
    // }
    // else{
    //   this.result = new Result();
    //   this.result.message = this.errorMessage;
    // }
    // }
    // else{
    //  this.result = new Result();
    //  this.result.message = this.errorMessage;
    // }
  }
}

