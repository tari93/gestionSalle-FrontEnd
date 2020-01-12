import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { TacheService } from '../services/tache.service';
import { SalleService } from '../services/salle.service';


@Injectable()
export class SalleResolver implements Resolve<any>{
    
    constructor(private salleService : SalleService){

    }

    resolve(){
        return this.salleService.getAll();
    }
}