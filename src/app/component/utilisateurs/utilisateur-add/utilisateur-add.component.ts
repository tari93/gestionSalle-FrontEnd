import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/shared/entities/role.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from 'src/app/shared/services/role.service';
import { UtilisateurService } from 'src/app/shared/services/utilisateur.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { UtilisateursComponent } from '../utilisateurs.component';
import { PersonneService } from 'src/app/shared/services/personne.service';

@Component({
  selector: 'app-utilisateur-add',
  templateUrl: './utilisateur-add.component.html',
  styleUrls: ['./utilisateur-add.component.css']
})
export class UtilisateurAddComponent implements OnInit {
  
  roles:Role[];
  selectedRole : Role;
  selectionnerRoleForm:FormGroup;
  
  constructor(
    private roleService:RoleService,
    private utilisateurService: UtilisateurService,
    private personneService : PersonneService,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    public dialogRef:MatDialogRef<UtilisateursComponent>,
    public dialog:MatDialog
  ) { }

  ngOnInit() {
    this.initRole();
    //this.roles = this.route.snapshot.data.roles;
    this.createUtilisateurForm();
  }
  initRole(){
    this.selectedRole  = new Role();
    this.roleService.getAll().subscribe(
        res=>{this.roles=res},
      
    );
  }
  createUtilisateurForm(){
    this.selectionnerRoleForm = this.fb.group({
      name : ['',Validators.required],
    });
}
  onSubmit(){
    const role=this.selectionnerRoleForm.value;
    console.log(role);
    console.log(this.personneService.selectedPersonne);
    this.dialogRef.close()
     this.personneService.generateUser(role).subscribe(
       res =>{
        this.utilisateurService.selectedUtilisateur=res;
        this.personneService.selectedPersonne.utilisateur=this.utilisateurService.selectedUtilisateur;
        console.log(this.personneService.selectedPersonne);
        this.openResult();
      }, 
      error => {console.log('generate user  failed !')},
     // () => {console.log(this.data)}
  );

  }

  openResult(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.personneService.update(this.personneService.selectedPersonne).subscribe(
      res=>{
          this.dialog.open(UtilisateursComponent,dialogConfig);
     //   this.dialog.closeAll();
      }
    );
  }
}