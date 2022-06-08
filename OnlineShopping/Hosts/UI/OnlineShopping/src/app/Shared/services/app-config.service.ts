import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  *  as  configData  from  'config.json';

@Injectable({
  providedIn: 'root'
})

// service that allows runtime configuration using config file in assets -> config.json
export class AppConfigService {


  private appConfig : any = (configData as any).default;

  constructor(private http: HttpClient) { }

public loadAppConfig(){
         this.appConfig = configData;
  }

  get apiBaseUrl(){
    if (!this.appConfig){
      throw Error('Config file not loaded!');
    }

    return this.appConfig.apiBaseUrl;
  }

  get defaultErrorMessage(){
    if (!this.appConfig){
      throw Error('Config file not loaded!');
    }

    return this.appConfig.defaultErrorMessage;
  }

  get loginTimeoutMilliseconds(){
    if (!this.appConfig){
      throw Error('Config file not loaded!');
    }

    return this.appConfig.loginTimeoutMilliseconds;
  }
}
