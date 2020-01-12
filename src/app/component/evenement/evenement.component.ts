import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import { EvenementService } from 'src/app/shared/services/evenement.service';
import { Evenement } from 'src/app/shared/entities/evenement.module';
import { map } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { EvenementAddComponent } from './evenement-add/evenement-add.component';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {

  public events:Evenement[];
  calendarEvents: EventInput[] = [
    ];
  constructor(private evenementService:EvenementService,
    private dialog:MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) { 
    
  }

  async ngOnInit() {
    await this.load();
    
   }

   async load()  {
    await this.evenementService.getAcceptedEvent().subscribe(
      data =>{this.events = data;
        
        this.events.forEach(e=>{
          let event:Evenement=e
          this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
            title: event.nom,
            start: new Date(event.dateDebut),
            end: new Date(event.dateFin),
        //    allDay: arg.allDay
          })
        });
        this.changeDetectorRefs.detectChanges();
      },
    );
    console.log(this.calendarEvents);
  }
  @ViewChild('calendar',{static:false}) calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = false;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  gotoPast() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  }

  handleDateClick(arg) {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.events.forEach(e=>{
        let event:Evenement=e
        this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
          title: event.nom,
          start: new Date(event.dateDebut),
          end: new Date(event.dateFin),
      //    allDay: arg.allDay
        })
      });
    }
  }
  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EvenementAddComponent,dialogConfig);

  }
}

