import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/shared/services/utilisateur.service';
import { Utilisateur } from 'src/app/shared/entities/utilisateur.model';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  selectedUser:Utilisateur;
  constructor(
    private userService:UtilisateurService,
    public dialogRef:MatDialogRef<UtilisateursComponent>
  ) { }

  ngOnInit() {
    this.selectedUser=this.userService.selectedUtilisateur;
  }
  onClose(){
    this.dialogRef.close();
  }

}
