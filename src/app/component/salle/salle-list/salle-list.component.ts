import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { Salle } from 'src/app/shared/entities/salle.module';
import { SalleService } from 'src/app/shared/services/salle.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SalleAddComponent } from '../salle-add/salle-add.component';

@Component({
  selector: 'app-salle-list',
  templateUrl: './salle-list.component.html',
  styleUrls: ['./salle-list.component.css']
})
export class SalleListComponent implements OnInit {
  listData: MatTableDataSource<any>;
  salles: Salle[];
  displayedColumns : string[] = ['nom','type','charge','actions'];
  searchKey:string;
  @ViewChild(MatSort,{ static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{ static: true}) paginator: MatPaginator;
 
  constructor(private salleService: SalleService,
    private fb : FormBuilder,
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private notificationService:NotificationService
    ) { }

  ngOnInit() {
    // this.courrierService.getAll().subscribe(
    //   data => {this.courriers=data},
    //   error => {console.log('An error was occured ')},
    //   () => {console.log('Loading data was done ')}
    // );
    this.init();
    this.load();
    console.log(this.salles);
    this.listData = new MatTableDataSource(this.salles);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  }
  init(){
    //this.selectedItem= this.initItem;
    this.salles = this.route.snapshot.data.salles;
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
    this.dialog.open(SalleAddComponent,dialogConfig);

  }
  onEdit(row){
    console.log(row);
    this.salleService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(SalleAddComponent,dialogConfig);
  }
  onDelete(numero){
    if(confirm('Voulez archiver ce equipement ? ')){
      this.salleService.delete(numero).subscribe(
        res => {
          this.notificationService.warn('cette salle a ete archivee');
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
    this.salleService.getAll().subscribe(
      data =>{this.salles = data},
      error => {console.log('loading equipements failed !')},
      () => {console.log(this.salles)}
    );
  }
}

