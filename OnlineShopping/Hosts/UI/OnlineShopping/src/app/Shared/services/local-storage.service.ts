import { Injectable } from '@angular/core';
import *  as  configData from 'config.json';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  // to do will implement generic
  user: any;
  UserType: string;

  configdata: any = (configData as any).default;

  constructor(private storageService: StorageService) { }

  setUserDetails(value) {
    let key = '-Xp2Dt!er';
    sessionStorage.setItem(key, this.storageService.encrypt(JSON.stringify(value)));
  }

  getUserDetails() {
    return this.storageService.decrypt(sessionStorage.getItem('-Xp2Dt!er'));
  }

  getconfigData() {
    return this.configdata;
  }

  public setCurrentOrder(value) {
    let key = 'p=lx_trl/ls';
    localStorage.setItem(key, this.storageService.encrypt(JSON.stringify(value)));
  }

  public getCurrentOrder() {
    return this.storageService.decrypt(localStorage.getItem('p=lx_trl/ls'));
  }

}
