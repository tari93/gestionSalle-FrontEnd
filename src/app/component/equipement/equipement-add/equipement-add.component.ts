import { Component, OnInit } from '@angular/core';
import { Equipement } from 'src/app/shared/entities/equipement.module';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EquipementService } from 'src/app/shared/services/equipment.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-equipement-add',
  templateUrl: './equipement-add.component.html',
  styleUrls: ['./equipement-add.component.css']
})
export class EquipementAddComponent implements OnInit {

  equipements: Equipement[];
  equipementForm : FormGroup;
  constructor(
    private equipementService : EquipementService,
    private fb:FormBuilder,
    private notifactionService:NotificationService,
   // private employeeService:EmployeeService,
    public dialogRef:MatDialogRef<EquipementAddComponent>
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
    this.equipementForm=new FormGroup({
      id: new FormControl(null),
      nom: new FormControl('',Validators.required),
      quantite : new FormControl('',Validators.required),
    });
   if(this.equipementService.selectedEquipement!=null){
     this.equipementForm.setValue(this.equipementService.selectedEquipement);
   }
  }
  onSubmit(){
    if(this.equipementForm.valid){
    //  this.changeDateFormat();
      const p =this.equipementForm.value;
    console.log(p);
    this.equipementService.add(p).subscribe(
      res => {
        //this.notifactionService.add(res,p.destinataire).subscribe(
         // res=>{
            this.notifactionService.success('Un nouveau equipement est ajoute avec succes');
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
    this.equipementForm.reset;
    this.equipementService.selectedEquipement=null;
    this.createForm();
    this.dialogRef.close();
  }

}
