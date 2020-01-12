import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { Personne } from 'src/app/shared/entities/personne.model';
import { PersonneService } from 'src/app/shared/services/personne.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PersonneAddComponent } from '../personne-add/personne-add.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UtilisateurAddComponent } from '../../utilisateurs/utilisateur-add/utilisateur-add.component';

@Component({
  selector: 'app-personne-list',
  templateUrl: './personne-list.component.html',
  styleUrls: ['./personne-list.component.css']
})
export class PersonneListComponent implements OnInit {

  listData: MatTableDataSource<any>;
  personnes : Personne[];
  statusValue: boolean[]= [];
  displayedColumns : string[] = ['id','cin','nom','prenom','dateNaissance','status','actions'];

  searchKey:string;
  @ViewChild(MatSort,{ static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{ static: true}) paginator: MatPaginator;
 
  constructor(private personneService : PersonneService,
    private fb : FormBuilder,
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private notificationService:NotificationService
    ) { 
    }

  ngOnInit() {
    // this.courrierService.getAll().subscribe(
    //   data => {this.courriers=data},
    //   error => {console.log('An error was occured ')},
    //   () => {console.log('Loading data was done ')}
    // );
    this.init();
    this.load();
    console.log(this.personnes);
    this.getStatus();
    this.listData = new MatTableDataSource(this.personnes);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;

  }
  init(){
    //this.selectedItem= this.initItem;
    this.personnes = this.route.snapshot.data.personnes;
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
    this.dialog.open(PersonneAddComponent,dialogConfig);

  }
  onEdit(row){
    console.log(row);
    this.personneService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(PersonneAddComponent,dialogConfig);
  }
  onDelete(numero){
    if(confirm('Voulez archiver ce utilisateur ? ')){
      this.personneService.delete(numero).subscribe(
        res => {
          this.notificationService.warn('L\'utilisateur est archivee');
       //   this.init();
          this.load();
        },
        error =>{
          this.notificationService.success('Error d\'envoi');
  
        }
      );
    }
  }
  getStatus(){
    for( var p of this.personnes){
      this.personneService.getStatus(p.id).subscribe(
        res => {
          console.log(res);
          if(res !=null){
            this.statusValue.push(res);
          }
        });
    }
    
  }
  changeStatus(row,status){
    console.log(row);
    this.personneService.populateForm(row);
    if(status){
      this.personneService.disableUser().subscribe(
        res => {
          //this.notifactionService.add(res,p.destinataire).subscribe(
           // res=>{
              this.notificationService.success('L\'utilisateur est desactivee');
            },
         // );
        //},
        error =>{
          this.notificationService.success('Error d\'activation');
  
        }
      );
     }
    else{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(UtilisateurAddComponent,dialogConfig);    
   
    }
  
  }
  load(){
    this.personneService.getAll().subscribe(
      data =>{this.personnes = data},
      error => {console.log('loading employees failed !')},
      () => {console.log(this.personnes)}
    );
  }
}

