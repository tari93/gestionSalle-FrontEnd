import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { NgModule } from '@angular/core';
import { PersonnesComponent } from './component/personnes/personnes.component';
import { RolesComponent } from './component/roles/roles.component';
import { RoleResolver } from './shared/resolvers/role.resolver';
import { DepartementResolver } from './shared/resolvers/departement.resolver';
import { PersonneResolver } from './shared/resolvers/personne.resolver';
import { EquipementComponent } from './component/equipement/equipement.component';
import { EquipementResolver } from './shared/resolvers/equipement.resolver';
import { SalleComponent } from './component/salle/salle.component';
import { SalleResolver } from './shared/resolvers/salle.resolver';
import { TacheResolver } from './shared/resolvers/tache.resolver';
import { EvenementResolver } from './shared/resolvers/evenement.resolver';
import { TacheComponent } from './component/tache/tache.component';
import { EvenementComponent } from './component/evenement/evenement.component';

export const appRoutes: Routes = [
    {
        path : 'home',
        component: HomeComponent,
        children:[
            {
                path:'personne',
                component: PersonnesComponent,
                resolve:{personnes: PersonneResolver},
                outlet:"contentOutlet",
            },
            {
                path:'roles',
                component: RolesComponent,
                resolve:{roles: RoleResolver},
                outlet:"contentOutlet",
            },
            {
                path:'equipements',
                component: EquipementComponent,
                resolve:{equipements: EquipementResolver},
                outlet:"contentOutlet",
            },  
              
            {
                path:'taches',
                component: TacheComponent,
                resolve:{taches: TacheResolver},
                outlet:"contentOutlet",
            },
            {
                path:'evenements',
                component: EvenementComponent,
                resolve:{evenements: EvenementResolver},
                outlet:"contentOutlet",
            },
            {
                path:'salles',
                component: SalleComponent,
                resolve:{salles: SalleResolver},
                outlet:"contentOutlet",
            },  
            {
                path:'events',
                component: EvenementComponent,
                resolve:{evenements: EvenementResolver},
                outlet:"contentOutlet",
            },  
  
                        
        ]
    },
    {path : 'login',component: LoginComponent},
    //{path : 'employeeManagement',component: EmployeeComponent,resolve:{employees: EmployeeResolver}},
    //{path: '',redirectTo:'/dashboard',pathMatch:'full'}
];

@NgModule({
    imports:[
        RouterModule.forRoot(
            appRoutes,
            {enableTracing:true}
        )
    ],
    exports: [RouterModule],
    providers: [
        PersonneResolver,
        RoleResolver,
        EquipementResolver,
        SalleResolver,
        TacheResolver,
        EvenementResolver
        
    ]
})
export class AppRoutingModule{
    
}