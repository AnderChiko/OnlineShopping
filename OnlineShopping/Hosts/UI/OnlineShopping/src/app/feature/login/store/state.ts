import { LoginResultDataResult, UserDataResult } from 'src/app/api';
import { IProcessable, Processable } from 'src/app/shared/core/models/processable';

export interface ILoginState {
    loginResult: IProcessable<LoginResultDataResult>;
    forgotPasswordResult: IProcessable<UserDataResult>;
    resetPasswordResult: IProcessable<UserDataResult>;
  }

export const initialLoginState: ILoginState = {
    loginResult: new Processable<LoginResultDataResult>(undefined),
    forgotPasswordResult: new Processable<UserDataResult>(undefined),
    resetPasswordResult: new Processable<UserDataResult>(undefined)
  };
