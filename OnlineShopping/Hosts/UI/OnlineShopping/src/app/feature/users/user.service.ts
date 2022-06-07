import { Injectable } from '@angular/core';
import { Client, Login, User } from 'src/app/api/nswag';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private swaggerClient: Client) { }

  registerUser = (user: User) => {
    return this.swaggerClient.register(user);
  };

}
