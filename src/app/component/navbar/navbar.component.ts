import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserPrincipal } from 'src/app/shared/UserPrincipal.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserPrincipalState } from 'src/app/shared/userPrincipal.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public role:string;
  private user:UserPrincipal;
  constructor(private store:Store<UserPrincipalState>,private notificationService:NotificationService) { }

  ngOnInit() {
    this.store.select('userPrincipal').subscribe(
      state =>{
        console.log(state);
        this.user=state;
      }
    );
    this.findRole();
  }
  
  findRole(){
    let role:string= 'ROLE_USER';
    this.user.authorities.forEach(
      element => {
        if(element.authority === 'ROLE_ADMIN'){
          role= 'ROLE_ADMIN';
        }
        if(element.authority === 'ROLE_BO'){
          role= 'ROLE_BO';
        }
    });
    this.role=role;
  }
  
  countCourrier(){
    this.notificationService.getNotificationByEmployee(this.user.username).subscribe
  }


}
