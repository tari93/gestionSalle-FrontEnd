import { Personne } from './personne.model';

export class Departement{
    constructor(
        public id ?: string ,
        public  nom ?:string,
        public chefDept ?: Personne
    ){

    }
}