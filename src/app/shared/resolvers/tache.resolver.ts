import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { TacheService } from '../services/tache.service';


@Injectable()
export class TacheResolver implements Resolve<any>{
    
    constructor(private tacheService : TacheService){

    }

    resolve(){
        return this.tacheService.getAll();
    }
}