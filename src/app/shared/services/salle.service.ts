import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { API_URLS } from 'src/app/config/url.config';
import { Salle } from '../entities/salle.module';

@Injectable()
export class SalleService{

    public selectedSalle : Salle;
    constructor(
        private http:HttpClient,
        ){

    }
    
    add( salle : Salle) : Observable<any>{
        return this.http.post(API_URLS.SALLES_URL ,salle);
    }
    update( salle : Salle) : Observable<any>{
        return this.http.put(API_URLS.SALLES_URL ,salle);
    }
    delete(id : string) : Observable<any>{
        return this.http.delete(API_URLS.SALLES_URL +'/'+id);
    }
    getAll() : Observable<any>{
        return this.http.get(API_URLS.SALLES_URL );
    }
    
    populateForm(role) {
        this.selectedSalle =role;
      }
    
    
}