import { SaveUserPrincipalAction, SAVE_USER_PRINCIPAL } from './save.userPrincipal.action';
import { UserPrincipal } from './UserPrincipal.model';

export function userPrincipalReducer(state:UserPrincipal,action:SaveUserPrincipalAction){
    switch(action.type){
        //rassemblage
        case SAVE_USER_PRINCIPAL:
            return Object.assign({},state,action.payload);
        default:
            return state;
            
    }

}