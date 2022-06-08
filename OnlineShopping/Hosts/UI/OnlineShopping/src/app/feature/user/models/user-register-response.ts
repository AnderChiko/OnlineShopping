import { User } from "./user";

export class UserRegisterResponse {
  requestMessage?: string;
  isSuccessStatusCode?: boolean;
  responseMessage?: string | undefined;
  responseObject?: User;

}
