import { User } from "../../user/models/user";

export class LoginResponse {
  requestMessage?: string;
  isSuccessStatusCode?: boolean;
  responseMessage?: string | undefined;
  responseObject?: User;

}
