import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { API_URLS } from 'src/app/config/url.config';
import { Equipement } from '../entities/equipement.module';

@Injectable()
export class EquipementService{

    public selectedEquipement : Equipement;
    constructor(
        private http:HttpClient,
        ){

    }
    
    add( event : Equipement) : Observable<any>{
        return this.http.post(API_URLS.EQUIPEMENTS_URL ,event);
    }
    update( event : Equipement) : Observable<any>{
        return this.http.put(API_URLS.EQUIPEMENTS_URL,event);
    }
    delete(id : string) : Observable<any>{
        return this.http.delete(API_URLS.EQUIPEMENTS_URL +'/'+id);
    }
    getAll() : Observable<any>{
        return this.http.get(API_URLS.EQUIPEMENTS_URL);
    }
    populateForm(role) {
        this.selectedEquipement =role;
      }
    
    
}