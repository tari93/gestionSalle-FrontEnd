import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library as fontLibrary } from '@fortawesome/fontawesome-svg-core';
import { faCalendar,  faClock } from '@fortawesome/free-regular-svg-icons';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonnesComponent } from './component/personnes/personnes.component';
import { PersonneAddComponent } from './component/personnes/personne-add/personne-add.component';
import { PersonneListComponent } from './component/personnes/personne-list/personne-list.component';
import { RolesComponent } from './component/roles/roles.component';
import { RoleAddComponent } from './component/roles/role-add/role-add.component';
import { RoleListComponent } from './component/roles/role-list/role-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { StoreModule } from '@ngrx/store';
import { RoleService } from './shared/services/role.service';
import { AppService } from './app.service';
import { PersonneService } from './shared/services/personne.service';
import { CookieService } from 'ngx-cookie-service';
import { userPrincipalReducer } from './shared/userPrincipal.reducer';
import { XhrInterceptor } from './xhr.interceptor';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ContentComponent } from './component/content/content.component';
import { DepartementService } from './shared/services/departement.service';
import { EquipementComponent } from './component/equipement/equipement.component';
import { EquipementListComponent } from './component/equipement/equipement-list/equipement-list.component';
import { EquipementAddComponent } from './component/equipement/equipement-add/equipement-add.component';
import { SalleComponent } from './component/salle/salle.component';
import { SalleListComponent } from './component/salle/salle-list/salle-list.component';
import { SalleAddComponent } from './component/salle/salle-add/salle-add.component';
import { EvenementComponent } from './component/evenement/evenement.component';
import { EvenementListComponent } from './component/evenement/evenement-list/evenement-list.component';
import { EvenementAddComponent } from './component/evenement/evenement-add/evenement-add.component';
import { TacheComponent } from './component/tache/tache.component';
import { TacheListComponent } from './component/tache/tache-list/tache-list.component';
import { TacheAddComponent } from './component/tache/tache-add/tache-add.component';
import { TacheService } from './shared/services/tache.service';
import { EvenementService } from './shared/services/evenement.service';
import { EquipementService } from './shared/services/equipment.service';
import { SalleService } from './shared/services/salle.service';
import { DateTimePickerComponent } from './component/date-time-picker/date-time-picker.component';
import { UtilisateurAddComponent } from './component/utilisateurs/utilisateur-add/utilisateur-add.component';
import { UtilisateurService } from './shared/services/utilisateur.service';
import { UtilisateursComponent } from './component/utilisateurs/utilisateurs.component';


fontLibrary.add(
  faCalendar,
  faClock
);


@NgModule({
  declarations: [
    AppComponent,
    PersonnesComponent,
    PersonneAddComponent,
    PersonneListComponent,
    RolesComponent,
    RoleAddComponent,
    RoleListComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ContentComponent,
    EquipementComponent,
    EquipementListComponent,
    EquipementAddComponent,
    SalleComponent,
    SalleListComponent,
    SalleAddComponent,
    EvenementComponent,
    EvenementListComponent,
    EvenementAddComponent,
    TacheComponent,
    TacheListComponent,
    TacheAddComponent,
    DateTimePickerComponent,
    UtilisateurAddComponent,
    UtilisateursComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    //Material design
    MaterialModule,
    StoreModule.forRoot({userPrincipal : userPrincipalReducer }),
    MDBBootstrapModule.forRoot(),
    NgbModule.forRoot(),
    FullCalendarModule 
  ],
  providers: [
    RoleService,
    PersonneService,
    DepartementService,
    TacheService,
    EvenementService,
    EquipementService,
    SalleService,
    UtilisateurService,
    AppService,
    {provide:HTTP_INTERCEPTORS,
      useClass: XhrInterceptor,
      multi:true
    },
    CookieService, 
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    PersonneAddComponent,
    RoleAddComponent,
    EquipementAddComponent,
    SalleAddComponent,
    EvenementAddComponent,
    UtilisateurAddComponent,
    UtilisateursComponent,
  ]
})
export class AppModule { }
