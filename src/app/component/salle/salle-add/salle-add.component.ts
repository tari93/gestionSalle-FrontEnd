import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Salle } from 'src/app/shared/entities/salle.module';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SalleService } from 'src/app/shared/services/salle.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatDialogRef, MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { Equipement } from 'src/app/shared/entities/equipement.module';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { EquipementResolver } from 'src/app/shared/resolvers/equipement.resolver';
import { EquipementService } from 'src/app/shared/services/equipment.service';

export interface Engineer {
  fullName: string;
  employeeId: number;
}
@Component({
  selector: 'app-salle-add',
  templateUrl: './salle-add.component.html',
  styleUrls: ['./salle-add.component.css']
})
export class SalleAddComponent implements OnInit {

  
  salles: Salle[];
  salleForm : FormGroup;
  
  constructor(
    private salleService : SalleService,
    private equipmentService:EquipementService,
    private fb:FormBuilder,
    private notifactionService:NotificationService,
   // private employeeService:EmployeeService,
    public dialogRef:MatDialogRef<SalleAddComponent>
  ) { 
    this.createForm();
  }




  createForm(){
    this.salleForm=new FormGroup({
      id: new FormControl(null),
      nom: new FormControl('',Validators.required),
      type : new FormControl('',Validators.required),
      charge : new FormControl('',Validators.required),
      available: new FormControl(''),
      equipements: new FormControl(null),
    });
   if(this.salleService.selectedSalle!=null){
     this.salleForm.setValue(this.salleService.selectedSalle);
   }
  }
  onSubmit(){
    if(this.salleForm.valid){
    //  this.changeDateFormat();
      const p =this.salleForm.value;
    console.log(p);
    this.salleService.add(p).subscribe(
      res => {
        //this.notifactionService.add(res,p.destinataire).subscribe(
         // res=>{
            this.notifactionService.success('Une nouvelle salle est ajoute avec succes');
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
    this.salleForm.reset;
    this.salleService.selectedSalle=null;
    this.createForm();
    this.dialogRef.close();
  }
  initRole(){
    //this.sele  = new Role();
    this.equipmentService.getAll().subscribe(
    );
  }

  public allEngineers: Engineer[] = [
    { fullName: 'A.N. Engineer', employeeId: 1 },
    { fullName: 'Some Other', employeeId: 2 },
    { fullName: 'Prof. Engineering', employeeId: 3 },
  ];
  public chipSelectedEngineers: Engineer[] = [];
  public filteredEngineers: Observable<String[]>;

  //
  // Set this to false to ensure engineers are from allEngineers list only.
  // Set this to true to also allow 'free text' engineers.
  //
  private allowFreeTextAddEngineer = false;

  public engineerControl = new FormControl();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  @ViewChild('engineerInput',{static:false}) engineerInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto',{static:false}) matAutocomplete: MatAutocomplete;

  ngOnInit() {
    this.filteredEngineers = this.engineerControl.valueChanges.pipe(
      startWith(null),
      map(engineerName => this.filterOnValueChange(engineerName))
    );
  }
  
  public addEngineer(event: MatChipInputEvent): void {
    if (!this.allowFreeTextAddEngineer) {
      // only allowed to select from the filtered autocomplete list
      console.log('allowFreeTextAddEngineer is false');
      return;
    }

    //
    // Only add when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    //
    if (this.matAutocomplete.isOpen) {
      return;
    }

     // Add our engineer
     const value = event.value;
     if ((value || '').trim()) {
      this.selectEngineerByName(value.trim());
    }

    this.resetInputs();
  }

  public removeEngineer(engineer: Engineer): void {
    const index = this.chipSelectedEngineers.indexOf(engineer);
    if (index >= 0) {
      this.chipSelectedEngineers.splice(index, 1);
      this.resetInputs();
    }
  }

  public engineerSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectEngineerByName(event.option.value);
    this.resetInputs();
  }

  private resetInputs() {
    // clear input element
    this.engineerInput.nativeElement.value = '';
    // clear control value and trigger engineerControl.valueChanges event 
    this.engineerControl.setValue(null); 
  }

  //
  // Compute a new autocomplete list each time control value changes
  //
  private filterOnValueChange(engineerName: string | null): String[] {
    let result: String[] = [];
    //
    // Remove the engineers we have already selected from all engineers to
    // get a starting point for the autocomplete list.
    //
    let allEngineersLessSelected = this.allEngineers.filter(engineer => this.chipSelectedEngineers.indexOf(engineer) < 0);
    if (engineerName) {
      result = this.filterEngineer(allEngineersLessSelected, engineerName);
    } else {
      result = allEngineersLessSelected.map(engineer => engineer.fullName);
    }
    return result;
  }

  private filterEngineer(engineerList: Engineer[], engineerName: String): String[] {
    let filteredEngineerList: Engineer[] = [];
    const filterValue = engineerName.toLowerCase();
    let engineersMatchingEngineerName = engineerList.filter(engineer => engineer.fullName.toLowerCase().indexOf(filterValue) === 0);
    if (engineersMatchingEngineerName.length || this.allowFreeTextAddEngineer) {
      //
      // either the engineer name matched some autocomplete options 
      // or the name didn't match but we're allowing 
      // non-autocomplete engineer names to be entered
      //
      filteredEngineerList = engineersMatchingEngineerName;
    } else {
      //
      // the engineer name didn't match the autocomplete list 
      // and we're only allowing engineers to be selected from the list
      // so we show the whjole list
      // 
      filteredEngineerList = engineerList;
    }
    //
    // Convert filtered list of engineer objects to list of engineer 
    // name strings and return it
    //
    return filteredEngineerList.map(engineer => engineer.fullName);
  }

  private selectEngineerByName(engineerName) {
    let foundEngineer = this.allEngineers.filter(engineer => engineer.fullName == engineerName);
    if (foundEngineer.length) {
      //
      // We found the engineer name in the allEngineers list
      //
      this.chipSelectedEngineers.push(foundEngineer[0]);
    } else {
      //
      // Create a new engineer, assigning a new higher employeeId
      // This is the use case when allowFreeTextAddEngineer is true
      //
      let highestEmployeeId = Math.max(...this.chipSelectedEngineers.map(engineer => engineer.employeeId), 0);
      this.chipSelectedEngineers.push({ fullName: engineerName, employeeId: highestEmployeeId + 1 });
    }
  }
}
