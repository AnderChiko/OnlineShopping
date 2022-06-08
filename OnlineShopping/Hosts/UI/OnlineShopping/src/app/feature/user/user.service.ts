import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/Shared/services';
import { User } from './models/user';
import { UserRegisterResponse } from './models/user-register-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  public register(user: User): Observable<UserRegisterResponse> {
    return this.apiService.POST("api/user/register", user);
  }

}
