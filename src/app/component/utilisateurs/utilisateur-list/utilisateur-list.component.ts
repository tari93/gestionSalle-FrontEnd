import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { UtilisateurAddComponent } from '../utilisateur-add/utilisateur-add.component';
import { Utilisateur } from 'src/app/shared/entities/utilisateur.model';
import { UtilisateurService } from 'src/app/shared/services/utilisateur.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.css']
})
export class UtilisateurListComponent implements OnInit {

  
  listData: MatTableDataSource<any>;
  utilisateurs : Utilisateur[];
  displayedColumns : string[] = ['login_utilisateur','isActive','actions'];
  searchKey:string;
  @ViewChild(MatSort,{ static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{ static: true}) paginator: MatPaginator;
 
  constructor(private utilisateurService : UtilisateurService,
    private fb : FormBuilder,
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private notificationService:NotificationService) { }

  ngOnInit() {
    // this.courrierService.getAll().subscribe(
    //   data => {this.courriers=data},
    //   error => {console.log('An error was occured ')},
    //   () => {console.log('Loading data was done ')}
    // );
    this.init();
    this.load();
    console.log(this.utilisateurs);
    this.listData = new MatTableDataSource(this.utilisateurs);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  }
  init(){
    //this.selectedItem= this.initItem;
    this.utilisateurs = this.route.snapshot.data.utilisateurs;
  }
  
  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }
  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(UtilisateurAddComponent,dialogConfig);

  }
  onEdit(row){
    console.log(row);
    this.utilisateurService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(UtilisateurAddComponent,dialogConfig);
  }
  onDelete(id){
    if(confirm('Voulez archiver ce courrier ? ')){
      this.utilisateurService.delete(id).subscribe(
        res => {
          this.notificationService.warn('Votre courrier a ete archivee');
       //   this.init();
          this.load();
        },
        error =>{
          this.notificationService.success('Error d\'envoi');
  
        }
      );
    }
  }
  load(){
    this.utilisateurService.getAll().subscribe(
      data =>{this.utilisateurs = data},
      error => {console.log('loading employees failed !')},
      () => {console.log(this.utilisateurs)}
    );
  }
}
