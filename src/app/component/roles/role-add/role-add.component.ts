import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { RoleService } from 'src/app/shared/services/role.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatDialogRef } from '@angular/material';
import { Role } from 'src/app/shared/entities/role.model';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.css']
})
export class RoleAddComponent implements OnInit {
  
  roles:Role[];
  roleForm : FormGroup;
  constructor(
    private roleService : RoleService,
    private fb:FormBuilder,
    private notifactionService:NotificationService,
   // private employeeService:EmployeeService,
    public dialogRef:MatDialogRef<RoleAddComponent>
  ) { 
    this.createForm();
  }


  ngOnInit() {
    /*this.personneService.getAll().subscribe(
      res =>{
        console.log(res);
        this.personnes=res
      }
    );*/
  }

  createForm(){
    this.roleForm=new FormGroup({
      id: new FormControl(null),
      name: new FormControl(''),
    });
   if(this.roleService.selectedRole!=null){
     this.roleForm.setValue(this.roleService.selectedRole);
   }
  }
  onSubmit(){
    if(this.roleForm.valid){
    //  this.changeDateFormat();
      const p =this.roleForm.value;
    console.log(p);
    this.roleService.add(p).subscribe(
      res => {
        //this.notifactionService.add(res,p.destinataire).subscribe(
         // res=>{
            this.notifactionService.success('Un nouveau role est ajoute avec succes');
          },
       // );
      //},
      error =>{
        this.notifactionService.success('Error d\'envoi');

      }
    );
    }
    this.onClose();
  }

  onClose(){
    this.roleForm.reset;
    this.roleService.selectedRole=null;
    this.createForm();
    this.dialogRef.close();
  }

}
