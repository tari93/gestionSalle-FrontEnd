import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Personne } from '../entities/personne.model';
import { API_URLS } from 'src/app/config/url.config';
import { Utilisateur } from '../entities/utilisateur.model';

@Injectable()
export class DepartementService{

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
    getEmployee(mail:string): Observable<any>{
        return this.http.get(API_URLS.PERSONNELS_URL+'/'+mail);
    }
    changeStatus(employee:Personne){
        let user:Utilisateur = new Utilisateur();
        

    }
    
    
}