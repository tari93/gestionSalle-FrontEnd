import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { TacheService } from '../services/tache.service';
import { SalleService } from '../services/salle.service';
import { EvenementService } from '../services/evenement.service';


@Injectable()
export class EvenementResolver implements Resolve<any>{
    
    constructor(private eventService : EvenementService){

    }

    resolve(){
        return this.eventService.getAll();
    }
}