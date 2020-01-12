import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Personne } from '../entities/personne.model';
import { API_URLS } from 'src/app/config/url.config';
import { Utilisateur } from '../entities/utilisateur.model';
import { Role } from '../entities/role.model';

@Injectable()
export class PersonneService{

    public selectedPersonne : Personne;
    constructor(
        private http:HttpClient,
        ){

    }
    
    add( personne : Personne) : Observable<any>{
        return this.http.post(API_URLS.PERSONNELS_URL,personne);
    }
    update( employee : Personne) : Observable<any>{
        return this.http.put(API_URLS.PERSONNELS_URL,employee);
    }
    delete(id : string) : Observable<any>{
        return this.http.delete(API_URLS.PERSONNELS_URL+'/'+id);
    }
    getAll() : Observable<any>{
        return this.http.get(API_URLS.PERSONNELS_URL);
    }
    getPersonne(mail:string) : Observable<any>{
        return this.http.get(API_URLS.PERSONNELS_URL+'/'+mail);
    }
    getStatus(id:String) : Observable<any>{
        return this.http.get(API_URLS.PERSONNELS_URL+'/'+id);
    }

    populateForm(personne) {
        this.selectedPersonne=personne;
      }

    generateUser(role:Role):Observable<any>{
        return this.http.post(API_URLS.USERS_URL,role);
    }


    disableUser():Observable<any>{
        this.selectedPersonne.utilisateur.enable=false;
        
        console.log(this.selectedPersonne);
        return this.http.put(API_URLS.USERS_URL,this.selectedPersonne.utilisateur);
    }
    
    
}