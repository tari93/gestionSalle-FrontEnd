import { Personne } from './personne.model';
import { Salle } from './salle.module';
import { Tache } from './tache.module';

export class Evenement{
    constructor(
    public id ?: string ,
	public nom?:string,
	public dateDebut ?:string ,
    public dateFin ?:string ,
    public charge ?: number,
    public organisateur ?:Personne,
    public programme ?: Tache[],
    public salle ?:Salle,
	public reserverd ?:boolean,
    ){
    }

}