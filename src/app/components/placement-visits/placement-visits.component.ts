import { formatDate } from '@angular/common';
import { AfterContentInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { PlacementVisit } from 'src/app/interfaces/PlacementVisit.model';
import { PlacementVisitSlot } from 'src/app/interfaces/PlacementVisitSlot.model';
import { User } from 'src/app/interfaces/User.model';
import { VisitingSlot } from 'src/app/interfaces/VisitingSlot.model';
import { PlacementVisitService } from 'src/app/services/placementVisit/placement-visit.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-placement-visits',
  templateUrl: './placement-visits.component.html',
  styleUrls: ['./placement-visits.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlacementVisitsComponent implements OnInit, AfterContentInit {



  errorMessage : string | undefined;
  successMessage : string | undefined;
  user : User | undefined;
  school : string | undefined;
  enableUpdateSlotAvailability : boolean = false;
  showCalendar : boolean = false;

  selectedDate : Date = new Date();
  selectedTime : string | undefined;
  selectedSlot : VisitingSlot | undefined;
  placementVisitSlot : PlacementVisitSlot | undefined;
  filteredSlotsOnDate : VisitingSlot[] = [];
  placementVisit : PlacementVisit | undefined;
  showVisitInfo : boolean = false;

  addSlotForm : FormGroup = new FormGroup({
    slotTime : new FormControl(null, Validators.required)
  });


  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      // Highlight the days that have slots available for each month.
      return this.isDateHasSlots(cellDate) ? 'example-custom-date-class' : '';
    }
    return '';
  };

  constructor(private userService : UserService,
    private placementVisitService : PlacementVisitService,
  private router : Router) {}

  ngOnInit() {
    
    this.errorMessage = undefined;
    this.successMessage = undefined;

    this.userService.getUser().subscribe({next : (user) =>{
      if(user){
        this.user = user;
        this.school = user.school;
      }
    }});

    this.placementVisitService.getPlacementVisitSlots(this.school ?? '').subscribe({
      next: (placementVisitSlot) => {
        this.placementVisitSlot = placementVisitSlot;
        this.filterSlotsOnDate(this.selectedDate);
      },error: (error) => {
        if(error.status == 404){
          this.placementVisitSlot = new PlacementVisitSlot(undefined,this.school ?? '',"",[]);
        }
      }
    });
  }

  ngAfterContentInit(){
    setTimeout(() => {
      this.showCalendar = true;
    }, 600);
  }
 
  isDateHasSlots(date : Date) : boolean{
    let slotsAvailable = false;
    this.placementVisitSlot?.slots.forEach((slot) => {
      if(formatDate(slot.start_time,'yyyy-MM-dd','en-US') === formatDate(date,'yyyy-MM-dd','en-US')) {
        slotsAvailable = true};
    })
    return slotsAvailable;
  }

  selectedVisitDate(value : any){
    this.errorMessage = undefined;
    this.successMessage = undefined;
    this.showVisitInfo = false;
    this.selectedDate = value;
    if(this.selectedDate != undefined || this.selectedDate != null){
      this.filterSlotsOnDate(this.selectedDate);
    }
  }

  filterSlotsOnDate(date : Date) {
    if(this.placementVisitSlot?.slots != undefined){
      this.filteredSlotsOnDate = this.placementVisitSlot?.slots.filter(slot => formatDate(slot.start_time, 'yyyy-MM-dd','en-US') === formatDate(date,'yyyy-MM-dd','en-US'))
    }
  }

  OnAddSlot() {

    this.errorMessage = undefined;
    this.successMessage = undefined;

    this.selectedTime = this.addSlotForm.value.slotTime;

    if(this.selectedTime != undefined){
      let hours = +this.selectedTime?.split(":")[0];
      let minutes = +this.selectedTime?.split(":")[1];

      let slotStartTime = new Date(this.selectedDate);
      slotStartTime.setHours(hours);
      slotStartTime.setMinutes(minutes);
      slotStartTime.setSeconds(0);

      let slotEndTime = new Date(slotStartTime);
      slotEndTime.setMinutes(slotEndTime.getMinutes() + 30);
      slotEndTime.setSeconds(0);
      
      let newVisitingSlot = new VisitingSlot(slotStartTime, slotEndTime, []);

      this.placementVisitSlot?.slots.push(newVisitingSlot);
      this.filterSlotsOnDate(this.selectedDate);
    }
    this.enableUpdateSlotAvailability = true;
  }

  OnRemoveSlot(removeSlot : VisitingSlot) {
    this.errorMessage = undefined;
    this.successMessage = undefined;

    if(this.placementVisitSlot != undefined) {
      this.placementVisitSlot.slots = this.placementVisitSlot.slots.filter(slot => slot.start_time !== removeSlot.start_time);
      this.filterSlotsOnDate(this.selectedDate);
    }
    this.enableUpdateSlotAvailability = true;
  }

  OnUpdatePlacementVisitSlot(){
    this.errorMessage = undefined;
    this.successMessage = undefined;

    if(this.placementVisitSlot != undefined){
      this.placementVisitService.updateAvailablePlacementVisitSlots(this.placementVisitSlot).subscribe({
        next : (placementVisitSlot) => {
          this.placementVisitSlot = placementVisitSlot;
          this.successMessage = "The Placement Visit Slots Availability is updated successfully";
          this.enableUpdateSlotAvailability = false;
          window.scrollTo(0, 0);
        }, error : (error) => {
          this.errorMessage = error.error;
          window.scrollTo(0, 0);
        }
      })
    }
  }

  OnShowGoogleMap(){
    this.router.navigate(['/placements-map-view']);
  }

  OnViewBooking(slot : VisitingSlot) {

    this.errorMessage = undefined;
    this.successMessage = undefined;
    this.selectedSlot = slot;

    this.placementVisitService.getPlacementVisitByPlacementVisitId(slot.placement_visit_ids[0]).subscribe({
      next : (placementVisit) => {
        this.placementVisit = placementVisit;
        this.showVisitInfo = true;
      },error : (error) => {
        this.errorMessage = error.error;
      }
    })
  }

}
