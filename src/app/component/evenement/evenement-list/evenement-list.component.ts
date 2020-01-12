import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { Evenement } from 'src/app/shared/entities/evenement.module';
import { EvenementService } from 'src/app/shared/services/evenement.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { EvenementAddComponent } from '../evenement-add/evenement-add.component';
import { element } from 'protractor';

@Component({
  selector: 'app-evenement-list',
  templateUrl: './evenement-list.component.html',
  styleUrls: ['./evenement-list.component.css']
})
export class EvenementListComponent implements OnInit {
  
  listData: MatTableDataSource<any>;
  evenements : Evenement[];
  statusValue: boolean[]= [];
  displayedColumns : string[] = ['nom','dateDebut','dateFin','reserverd','actions'];

  searchKey:string;
  @ViewChild(MatSort,{ static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{ static: true}) paginator: MatPaginator;
 
  constructor(private service : EvenementService,
    private fb : FormBuilder,
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private notificationService:NotificationService,
    private changeDetectorRefs: ChangeDetectorRef
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
    console.log(this.evenements);
    this.listData = new MatTableDataSource(this.evenements);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;

  }
  init(){
    //this.selectedItem= this.initItem;
    this.evenements = this.route.snapshot.data.evenements;
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
    this.dialog.open(EvenementAddComponent,dialogConfig);
    this.load();
  }
  onEdit(row){
    console.log(row);
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EvenementAddComponent,dialogConfig);
    this.load();
      
  }
  onDelete(numero){
    if(confirm('Voulez vous supprimez ce evenement ? ')){
      this.service.delete(numero).subscribe(
        res => {
          this.notificationService.warn('L\'utilisateur est archivee');
       //   this.init();
          this.load();
        },
        error =>{
          this.notificationService.success('Error d\'envoi');
  
        }
      );
      this.load();
    }
  }
  load(){
    this.service.getAll().subscribe(
      data =>{this.evenements = data;
       
      },
      error => {console.log('loading employees failed !')},
      () => {console.log(this.evenements)}
    );
  }
  changeStatus(evenement){
    if(evenement.reserverd){
      evenement.reserverd=false;
      console.log('false here');
    }else{
      evenement.reserverd=true;
      console.log('true here');
    }
    this.service.populateForm(evenement);
    console.log(evenement);
      this.service.changeEvent().subscribe(
        res => {
          //this.notifactionService.add(res,p.destinataire).subscribe(
           // res=>{
              this.notificationService.success('L\'evenement est modifie');
             
            },
         // );
        //},
        error =>{
          this.notificationService.success('Error d\'activation');
  
        }
      );
      this.load();
     }
  
  
}

