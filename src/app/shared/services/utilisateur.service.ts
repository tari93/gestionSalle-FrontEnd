import { Injectable } from '@angular/core';
import { Utilisateur } from '../entities/utilisateur.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../../config/url.config';

@Injectable()
export class UtilisateurService {

    public selectedUtilisateur:Utilisateur;
    
    constructor(
        private http:HttpClient,
        ){

    }
    
    add( user: Utilisateur) : Observable<any>{
       // if(this.getEmployeeCourrier(courrier.destinataire)!=null){
            return this.http.post(API_URLS.COURRIER_URL,user);
        //}
        //return null;
    }
    update( user: Utilisateur) : Observable<any>{
        return this.http.put(API_URLS.COURRIER_URL,user);
    }
    delete(id : string) : Observable<any>{
        return this.http.delete(API_URLS.COURRIER_URL+'/'+id);
    }
    getAll() : Observable<any>{
        return this.http.get(API_URLS.COURRIER_URL);
    }
    populateForm(courrier) {
        this.selectedUtilisateur=courrier;
      }
      getEmployeeCourrier(email:string){
          return this.http.get(API_URLS.COURRIER_URL+'/employee/'+email);
      }
    
}