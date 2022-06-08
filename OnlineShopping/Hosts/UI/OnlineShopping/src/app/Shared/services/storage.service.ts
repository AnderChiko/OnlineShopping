import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
//import { SecureStorage } from 'secure-web-storage';
const SECRET_KEY = 'hstcovid_key';


@Injectable({
  providedIn: 'root'
  })
export class StorageService {
constructor() { }
//public secureStorage = new SecureStorage(localStorage, {
// Encrypt the localstorage data
encrypt(data) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);
    data = data.toString();
    return data;
}
// Decrypt the encrypted data
 decrypt(data) {

  if(!data)
   return null;

    data = CryptoJS.AES.decrypt(data, SECRET_KEY);
    data = data.toString(CryptoJS.enc.Utf8);
    return data;
}
//});
}
