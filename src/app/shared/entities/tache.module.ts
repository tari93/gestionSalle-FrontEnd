import { Personne } from './personne.model';
import { Salle } from './salle.module';

export class Tache{
    constructor(
    public id ?: string ,
	public libelle?:string,
	public description ?:string ,
    public dateDebut ?:string ,
    public dateFin ?:string ,
    ){
    }

}