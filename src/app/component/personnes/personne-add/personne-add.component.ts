import { Component, OnInit } from '@angular/core';
import { Personne } from 'src/app/shared/entities/personne.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PersonneService } from 'src/app/shared/services/personne.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-personne-add',
  templateUrl: './personne-add.component.html',
  styleUrls: ['./personne-add.component.css'],
  providers:[DatePipe]
})
export class PersonneAddComponent implements OnInit {

  sexeENUM=[
    {id:"HOMME", value:'HOMME'},
    {id: 'FEMME', value:'FEMME'},
  ];
  personnes:Personne[];
  personneForm : FormGroup;
  constructor(
    private personneService: PersonneService,
    private fb:FormBuilder,
    private datePipe: DatePipe,
    private notifactionService:NotificationService,
   // private employeeService:EmployeeService,
    public dialogRef:MatDialogRef<PersonneAddComponent>
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
    this.personneForm=new FormGroup({
      id: new FormControl(null),
      nom: new FormControl(''),
      //pieceJUrl: new FormControl(null),
      prenom :new FormControl('',Validators.required),
      cin:new FormControl(''),
      email :new FormControl('', Validators.email),
      dateNaissance:new FormControl('',Validators.required),
      avatar_image :new FormControl(''),
      adresse :new FormControl(''),
      sexe :new FormControl(0),
      utilisateur :new FormControl(null),

      //provenance:new FormControl(0),
      //  typeCourrier:new FormControl('courrierArrive'),
    });
   if(this.personneService.selectedPersonne!=null){
     this.personneForm.setValue(this.personneService.selectedPersonne);
   }
  }
  onSubmit(){
    if(this.personneForm.valid){
    //  this.changeDateFormat();
      const p =this.personneForm.value;
      p.dateNaissance   = this.datePipe.transform(p.dateNaissance, 'yyyy-mm-dd HH:mm:ss');
    console.log(p);
    this.personneService.add(p).subscribe(
      res => {
        //this.notifactionService.add(res,p.destinataire).subscribe(
         // res=>{
            this.notifactionService.success('L\'utilisateur est ajoutee avec succes');
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
    this.personneForm.reset;
    this.personneService.selectedPersonne=null;
    this.createForm();
    this.dialogRef.close();
  }

}
