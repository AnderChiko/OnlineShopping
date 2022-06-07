
import { IUserApiResponse, UserApiResponse } from 'src/app/api/nswag';
import { IProcessable, Processable } from 'src/app/shared/core/models/processable';

export interface IUserState {
  userResult: IProcessable<IUserApiResponse>;
}

export const initialUserState: IUserState = {
  userResult: new Processable<IUserApiResponse>(undefined)
};
