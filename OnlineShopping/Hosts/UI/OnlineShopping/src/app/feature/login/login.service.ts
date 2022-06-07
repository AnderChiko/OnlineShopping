import { Injectable } from '@angular/core';
import { Client, Login } from 'src/app/api/nswag';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private swaggerClient: Client) { }

  login = (login: Login) => this.swaggerClient.login(login);

}
