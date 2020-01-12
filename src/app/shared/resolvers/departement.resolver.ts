import { Resolve } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { Injectable } from '@angular/core';
import { PersonneService } from '../services/personne.service';


@Injectable()
export class   DepartementResolver implements Resolve<any>{
    
    constructor(private personneService : PersonneService){

    }

    resolve(){
        return this.personneService.getAll();
    }
}