import { User } from "../../user/models/user";

export class Login {
  public emailaddress: string;
  public password: string;

  constructor(username: string, password: string) {
    this.emailaddress = username;
    this.password = password;
  }
}

