import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { API_URLS } from 'src/app/config/url.config';
import { Evenement } from '../entities/evenement.module';
import { Tache } from '../entities/tache.module';

@Injectable()
export class TacheService{

    public selectedTache : Tache;
    constructor(
        private http:HttpClient,
        ){

    }
    
    add( tache : Tache) : Observable<any>{
        return this.http.post(API_URLS.TACHES_URL ,tache);
    }
    update( tache : Tache) : Observable<any>{
        return this.http.put(API_URLS.TACHES_URL ,tache);
    }
    delete(id : string) : Observable<any>{
        return this.http.delete(API_URLS.TACHES_URL +'/'+id);
    }
    getAll() : Observable<any>{
        return this.http.get(API_URLS.TACHES_URL );
    }
    
    
}