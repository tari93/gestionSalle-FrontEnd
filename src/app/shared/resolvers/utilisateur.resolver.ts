import { Resolve } from '@angular/router';
import { UtilisateurService } from '../services/utilisateur.service';
import { Injectable } from '@angular/core';


@Injectable()
export class UtilisateurResolver implements Resolve<any>{
    
    constructor(private utilisateurService : UtilisateurService){

    }

    resolve(){
        return this.utilisateurService.getAll();
    }
}