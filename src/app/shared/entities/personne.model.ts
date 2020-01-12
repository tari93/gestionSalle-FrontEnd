import { Utilisateur } from './utilisateur.model';

export class Personne{
    constructor(
    public id ?: string ,
	public cin ?:string ,
	public  nom ?:string,
	public prenom ?:string ,
	public adresse ?:string ,
	public avatar_image ?:string ,
	public sexe ?:string ,
	public dateNaissance?:string,
	public email ?:string ,
	public utilisateur ?: Utilisateur
	//private  isActive:boolean,
    ){
    }

}