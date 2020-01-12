import { Role } from '../entities/role.model';
import { Observable } from 'rxjs';
import { API_URLS } from '../../config/url.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoleService{

    
    public selectedRole : Role;
 
    constructor(private http:HttpClient){

    }
    add( role : Role) : Observable<any>{
        return this.http.post(API_URLS.ROLES_URL,role);
    }
    update( role : Role) : Observable<any>{
        return this.http.put(API_URLS.ROLES_URL,role);
    }
    delete(id : string) : Observable<any>{
        return this.http.delete(API_URLS.ROLES_URL+'/'+id);
    }
    getAll() : Observable<any>{
        return this.http.get(API_URLS.ROLES_URL);
    }
    populateForm(role) {
        this.selectedRole =role;
      }
}