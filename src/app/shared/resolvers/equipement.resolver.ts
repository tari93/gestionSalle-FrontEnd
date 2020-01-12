import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { EquipementService } from '../services/equipment.service';


@Injectable()
export class EquipementResolver implements Resolve<any>{
    
    constructor(private equipemetService : EquipementService){

    }

    resolve(){
        return this.equipemetService.getAll();
    }
}