import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Personne } from '../entities/personne.model';
import { API_URLS } from 'src/app/config/url.config';
import { Utilisateur } from '../entities/utilisateur.model';
import { Evenement } from '../entities/evenement.module';

@Injectable()
export class EvenementService{

    public selectedEvent : Evenement;
    constructor(
        private http:HttpClient,
        ){

    }
    
    add( event : Evenement) : Observable<any>{
        return this.http.post(API_URLS.EVENEMENTS_URL ,event);
    }
    update( event : Evenement) : Observable<any>{
        return this.http.put(API_URLS.EVENEMENTS_URL ,event);
    }
    delete(id : string) : Observable<any>{
        return this.http.delete(API_URLS.EVENEMENTS_URL +'/'+id);
    }
    getAll() : Observable<any>{
        return this.http.get(API_URLS.EVENEMENTS_URL );
    }
    getAcceptedEvent() : Observable<any>{
        return this.http.get(API_URLS.RESERVED_EVENT_URL );
    }
    populateForm(personne) {
        this.selectedEvent=personne;
      }
      changeEvent():Observable<any>{
        //this.selectedEvent.reserverd=false;
        return this.http.put(API_URLS.EVENEMENTS_URL,this.selectedEvent);
    }
    
}