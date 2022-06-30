export class User {
  emailAddress: string;
  password: string;
  name: string;

  constructor(emailaddress: string, password: string) {
    this.emailAddress = emailaddress;
    this.password = password;
    this.name = '';
  }
}

