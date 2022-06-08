export class User {
  emailaddress: string;
  password: string;

  constructor(emailaddress: string, password: string) {
    this.emailaddress = emailaddress;
    this.password = password;
  }
}

