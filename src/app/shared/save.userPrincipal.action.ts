import { Action } from '@ngrx/store';
import { UserPrincipal } from './UserPrincipal.model';

export const SAVE_USER_PRINCIPAL = 'SAVE_USER';

export class SaveUserPrincipalAction implements Action{

    readonly type = SAVE_USER_PRINCIPAL;
    
    constructor( public payload : UserPrincipal ){

    }
}