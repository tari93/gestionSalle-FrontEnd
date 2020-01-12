import { Utilisateur } from './utilisateur.model';
import { Equipement } from './equipement.module';

export class Salle{
    constructor(
    public id ?: string ,
	public nom?:string,
	public type ?:string ,
    public charge ?: number,
    public equipments ?:Equipement[],
    public isAvailable ?:boolean 
	//private  isActive:boolean,
    ){
    }

}