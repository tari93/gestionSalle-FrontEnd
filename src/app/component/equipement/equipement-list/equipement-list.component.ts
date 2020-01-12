import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { Equipement } from 'src/app/shared/entities/equipement.module';
import { EquipementService } from 'src/app/shared/services/equipment.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { EquipementAddComponent } from '../equipement-add/equipement-add.component';

@Component({
  selector: 'app-equipement-list',
  templateUrl: './equipement-list.component.html',
  styleUrls: ['./equipement-list.component.css']
})
export class EquipementListComponent implements OnInit {

  
  listData: MatTableDataSource<any>;
  equipements : Equipement[];
  statusValue: boolean[]= [];
  displayedColumns : string[] = ['id','cin','nom','prenom','dateNaissance','status','actions'];

  searchKey:string;
  @ViewChild(MatSort,{ static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{ static: true}) paginator: MatPaginator;
 
  constructor(private service : EquipementService,
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
   // this.getStatus();
    this.listData = new MatTableDataSource(this.equipements);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;

  }
  init(){
    //this.selectedItem= this.initItem;
    this.equipements = this.route.snapshot.data.equipements;
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
    this.dialog.open(EquipementAddComponent,dialogConfig);

  }
  onEdit(row){
    console.log(row);
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EquipementAddComponent,dialogConfig);
  }
  onDelete(numero){
    if(confirm('Voulez archiver ce utilisateur ? ')){
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
    }
  }


  load(){
    this.service.getAll().subscribe(
      data =>{this.equipements = data},
      error => {console.log('loading employees failed !')},
      () => {console.log(this.equipements)}
    );
  }
}

