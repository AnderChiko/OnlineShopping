import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Shared/services/local-storage.service';
import { LoginResponse } from './models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<LoginResponse>;
  public currentUser: Observable<LoginResponse>;

  constructor(
    private localStorageService: LocalStorageService
    , private routerService: Router
  ) {

    this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(this.localStorageService.getUserDetails()));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public failedLogin() {
    this.localStorageService.setUserDetails(null);
  }

  public logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.localStorageService.setUserDetails(null);
    this.currentUserSubject.next(null);
    this.routerService.navigate(['home']);
  }

  public GotoLogin() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.localStorageService.setUserDetails(null);
    this.currentUserSubject.next(null);
    this.routerService.navigate(['login']);
  }
}
