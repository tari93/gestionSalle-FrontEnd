import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { Role } from 'src/app/shared/entities/role.model';
import { RoleService } from 'src/app/shared/services/role.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { RoleAddComponent } from '../role-add/role-add.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  listData: MatTableDataSource<any>;
  roles : Role[];
  displayedColumns : string[] = ['name','actions'];
  searchKey:string;
  @ViewChild(MatSort,{ static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{ static: true}) paginator: MatPaginator;
 
  constructor(private roleService : RoleService,
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
    console.log(this.roles);
    this.listData = new MatTableDataSource(this.roles);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  }
  init(){
    //this.selectedItem= this.initItem;
    this.roles = this.route.snapshot.data.roles;
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
    this.dialog.open(RoleAddComponent,dialogConfig);

  }
  onEdit(row){
    console.log(row);
    this.roleService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(RoleAddComponent,dialogConfig);
  }
  onDelete(numero){
    if(confirm('Voulez archiver ce courrier ? ')){
      this.roleService.delete(numero).subscribe(
        res => {
          this.notificationService.warn('Le role a ete archivee');
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
    this.roleService.getAll().subscribe(
      data =>{this.roles = data},
      error => {console.log('loading employees failed !')},
      () => {console.log(this.roles)}
    );
  }
}

