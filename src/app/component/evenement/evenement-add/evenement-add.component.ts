import { Component, OnInit } from '@angular/core';
import { Evenement } from 'src/app/shared/entities/evenement.module';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EvenementService } from 'src/app/shared/services/evenement.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatDialogRef } from '@angular/material';
import { Salle } from 'src/app/shared/entities/salle.module';
import { SalleService } from 'src/app/shared/services/salle.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-evenement-add',
  templateUrl: './evenement-add.component.html',
  styleUrls: ['./evenement-add.component.css'],
  providers:[DatePipe]
})
export class EvenementAddComponent implements OnInit {
 
  evenements: Evenement[];
  salles:Salle[];
  evenementForm : FormGroup;
  dateDebut:string = new Date().toString();
  dateFin:string  = new Date().toString();

  constructor(
    private evenementService : EvenementService,
    private datePipe: DatePipe,
    private salleServie : SalleService,
    private fb:FormBuilder,
    private notifactionService:NotificationService,
   // private employeeService:EmployeeService,
    public dialogRef:MatDialogRef<EvenementAddComponent>
  ) { 
    this.createForm();
  }


  ngOnInit() {
    this.salleServie.getAll().subscribe(
      res =>{
        console.log(res);
        this.salles=res
      }
    );
  }

  createForm(){
    this.evenementForm=new FormGroup({
      id: new FormControl(null),
      nom: new FormControl('',Validators.required),
      salle: new FormControl(0,),
      programme: new FormControl(null,),
      organisateur: new FormControl(null),
      // dateDebut:  new FormControl(new Date().toString(), {validators: [Validators.required, DateTimeValidator]}),
      // dateFin:  new FormControl(new Date().toString(), {validators: [Validators.required, DateTimeValidator]}),
    }, { updateOn: 'change' });
   if(this.evenementService.selectedEvent!=null){
     this.evenementForm.setValue(this.evenementService.selectedEvent);
   }
  }
  onSubmit(){
    if(this.evenementForm.valid){
  //    let salles:Salle[];
    //  salles[0]=this.evenementForm.value.salles;

    //  this.changeDateFormat();
      const p =this.evenementForm.value;
      console.log(p);
      // p.dateDebut = this.dateDebut;
      // p.dateFin = this.dateFin;
      // p.dateDebut=new Date(this.dateDebut.getUTCFullYear(), this.dateDebut.getUTCMonth(),
      // this.dateDebut.getUTCDate(),  this.dateDebut.getUTCHours(), this.dateDebut.getUTCMinutes(),
      // this.dateDebut.getUTCSeconds()).toString();
      // p.dateFin=new Date(this.dateDebut.getUTCFullYear(), this.dateDebut.getUTCMonth(),
      // this.dateDebut.getUTCDate(),  this.dateDebut.getUTCHours(), this.dateDebut.getUTCMinutes(),
      // this.dateDebut.getUTCSeconds()).toString();
        p.dateDebut   = this.datePipe.transform(this.dateDebut, 'yyyy-MM-dd HH:mm:ss');
       p.dateFin = this.datePipe.transform(this.dateFin, 'yyyy-MM-dd HH:mm:ss');
       //2020-01-09T01:26:30+01:00
    
    this.evenementService.add(p).subscribe(
      res => {
        //this.notifactionService.add(res,p.destinataire).subscribe(
         // res=>{
            this.notifactionService.success('L\'evenement est ajoutee avec succes');
            console.log(res);
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
    this.evenementForm.reset;
    this.evenementService.selectedEvent=null;
    this.createForm();
    this.dialogRef.close();
  }

}
export const DateTimeValidator = (fc: FormControl) => {
  const date = new Date(fc.value);
  const isValid = !isNaN(date.valueOf());
  return isValid ? null : {
      isValid: {
          valid: false
      }
  };
};