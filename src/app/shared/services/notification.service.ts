import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../../config/url.config';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notification:Notification;
  dateCreation:Date= new Date();  

  constructor(public snackbar:MatSnackBar, private http:HttpClient) { }

  config:MatSnackBarConfig = {
    duration:3000,
    horizontalPosition: "right",
    verticalPosition: "top",
  }


  getNotificationByEmployee(id : string) : Observable<any>{
    return this.http.get(API_URLS.NOTIFICATION_URL+'/'+id);
  }
  getAll() : Observable<any>{
    return this.http.get(API_URLS.PERSONNELS_URL);
  }

  success(msg){
    //css rules for notification and success classes
    this.config['panelClass'] = ['notifcation','success'];
    this.snackbar.open(msg,'',this.config);
  }
  
  warn(msg){
    //css rules for notification and success classes
    this.config['panelClass'] = ['notifcation','warn'];
    this.snackbar.open(msg,'',this.config);
  }

}
