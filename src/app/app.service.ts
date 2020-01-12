import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from './config/url.config';
import {CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { UserPrincipal } from './shared/UserPrincipal.model';
import { SAVE_USER_PRINCIPAL } from './shared/save.userPrincipal.action';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  authenticated:boolean=false;
  
  constructor(
    private http:HttpClient,
    private cookieService:CookieService,
    private store:Store<UserPrincipal> ) { }

  authenticate(credentials,callback){
    if(credentials){
      const token = btoa(credentials.username+ ':'+credentials.password);
      this.cookieService.set('token',token);
      /*const headers = new HttpHeaders({
        authorization : 'Basic' + token
      });*/

      this.http.get(API_URLS.LOGIN_URL).subscribe(response =>{
        if(response && response['name']){
          //save in store
          response = {
            ...{
              user:null,
            },
            ...response
          };
          this.authenticated=true;
          this.store.dispatch({
            type : SAVE_USER_PRINCIPAL,
            payload : response 
          });
        }else{
          this.authenticated=false;
        }
        return callback && callback();
      });
    }else{
      this.authenticated=false;
    }
  }
}
