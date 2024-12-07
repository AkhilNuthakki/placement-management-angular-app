import { formatDate } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { Placement } from 'src/app/interfaces/Placement.model';
import { PlacementVisit } from 'src/app/interfaces/PlacementVisit.model';
import { PlacementVisitRequest } from 'src/app/interfaces/PlacementVisitRequest';
import { User } from 'src/app/interfaces/User.model';
import { VisitingSlot } from 'src/app/interfaces/VisitingSlot.model';
import { PlacementService } from 'src/app/services/placement/placement.service';
import { PlacementVisitService } from 'src/app/services/placementVisit/placement-visit.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlacementComponent implements OnInit{

  errorMessage : string | undefined;
  successMessage : string | undefined;
  user : User | undefined;
  userRole : string | undefined;
  isStudent : boolean = false;
  isTutor : boolean = false;
  isProvider : boolean = false;
  placementId : string | undefined;
  placement : Placement | undefined;
  viewMode : boolean = true;
  placementVisits : PlacementVisit[] = [];
  updatePlacementVisit : PlacementVisit | undefined;
  visitsExists : boolean = false;

  scheduleVisitForm : FormGroup = new FormGroup({
    providerContactName : new FormControl(null, Validators.required),
    providerContactEmail : new FormControl(null, Validators.required),
    visitStartTime : new FormControl(null, Validators.required),
    visitEndTime : new FormControl(null, Validators.required)
  });
  showBookSlotView : boolean = false;
  selectedDate : Date = new Date();
  selectedSlot : VisitingSlot | undefined;
  availableSlots : VisitingSlot[] = [];
  filteredSlotsOnDate : VisitingSlot[] = [];


  placementForm : FormGroup = new FormGroup({
    roleTitle : new FormControl(null),
    roleStartDate : new FormControl(null, Validators.required),
    roleEndDate : new FormControl(null, Validators.required),
    studentFirstName : new FormControl(null),
    studentLastName : new FormControl(null),
    studentNumber : new FormControl(null),
    studentEmailId : new FormControl(null),
    studentCourse : new FormControl(null),
    studentSchool : new FormControl(null),
    studentTelephone : new FormControl(null),
    providerName : new FormControl(null),
    providerAddress : new FormControl(null),
    providerPostcode : new FormControl(null),
    providerWebAddress : new FormControl(null),
    providerContactName : new FormControl(null, Validators.required),
    providerContactJobTitle : new FormControl(null, Validators.required),
    providerContactEmail : new FormControl(null, Validators.required),
    providerContactTelephone : new FormControl(null, Validators.required)
  });

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      // Highlight the days that have slots available for each month.
      return this.isDateHasSlots(cellDate) ? 'example-custom-date-class' : '';
    }
    return '';
  };

  constructor(private route : ActivatedRoute,
    private userService : UserService,
    private placementService : PlacementService,
    private placementVisitService : PlacementVisitService
  ){

  }

  ngOnInit(): void {
    this.errorMessage = undefined;
    this.successMessage = undefined;

    this.userService.getUser().subscribe({next : (user) =>{
      if(user){
        this.user = user;
        this.userRole = user.user_role;
        this.isStudent = user.user_role == 'STUDENT' ? true : false;
        this.isTutor = user.user_role == 'TUTOR' ? true : false;
        this.isProvider = user.user_role == 'PROVIDER' ? true : false;
      }
    }}
    );

    this.route.paramMap.subscribe(params => {
      this.placementId = params.get('id') ?? undefined;

      if (this.placementId != undefined || this.placementId != null) {
        this.placementService.getPlacementById(this.placementId).subscribe({
          next: (placement) => {
            this.placement = placement;
            this.loadForm();

          },
          error: (error) => {
            this.errorMessage = error.error;
          }
        });

        this.fetchPlacementVisits();
      }
    });
    
  }

  onViewMode(){
    this.viewMode = true;
    this.placementForm.disable();
  }

  loadForm(){
    //Load role details
    this.placementForm.get('roleTitle')?.setValue(this.placement?.role_title);
    this.placementForm.get('roleStartDate')?.setValue(formatDate(this.placement?.start_date ?? '','yyyy-MM-dd','en-US'));
    this.placementForm.get('roleEndDate')?.setValue(formatDate(this.placement?.end_date ?? '','yyyy-MM-dd','en-US'));

    //load student details
    this.placementForm.get('studentFirstName')?.setValue(this.placement?.student.first_name);
    this.placementForm.get('studentLastName')?.setValue(this.placement?.student.last_name);
    this.placementForm.get('studentNumber')?.setValue(this.placement?.student.student_number);
    this.placementForm.get('studentEmailId')?.setValue(this.placement?.student.email_id);
    this.placementForm.get('studentCourse')?.setValue(this.placement?.student.course);
    this.placementForm.get('studentSchool')?.setValue(this.placement?.student.school);
    this.placementForm.get('studentTelephone')?.setValue(this.placement?.student.telephone);

    //load provider details
    this.placementForm.get('providerName')?.setValue(this.placement?.placement_provider.name);
    this.placementForm.get('providerAddress')?.setValue(this.placement?.placement_provider.address);
    this.placementForm.get('providerPostcode')?.setValue(this.placement?.placement_provider.postcode);
    this.placementForm.get('providerWebAddress')?.setValue(this.placement?.placement_provider.web_address);
    this.placementForm.get('providerContactName')?.setValue(this.placement?.placement_provider.contact_name);
    this.placementForm.get('providerContactJobTitle')?.setValue(this.placement?.placement_provider.contact_job_title);
    this.placementForm.get('providerContactEmail')?.setValue(this.placement?.placement_provider.contact_email);
    this.placementForm.get('providerContactTelephone')?.setValue(this.placement?.placement_provider.telephone);

    this.onViewMode();
  }

  OnEdit(){
    this.errorMessage = undefined;
    this.successMessage = undefined;

    this.viewMode = false;
    this.placementForm.get('roleStartDate')?.enable();
    this.placementForm.get('roleEndDate')?.enable();
    this.placementForm.get('providerContactName')?.enable();
    this.placementForm.get('providerContactJobTitle')?.enable();
    this.placementForm.get('providerContactEmail')?.enable();
    this.placementForm.get('providerContactTelephone')?.enable();
  }

  OnCancel(){
    this.errorMessage = undefined;
    this.successMessage = undefined;

    this.loadForm();
  }

  OnUpdatePlacement(){
    this.errorMessage = undefined;
    this.successMessage = undefined;

    if(this.placement != undefined){

      this.placement.start_date = this.placementForm.value.roleStartDate;
      this.placement.end_date = this.placementForm.value.roleEndDate;
      this.placement.placement_provider.contact_name = this.placementForm.value.providerContactName;
      this.placement.placement_provider.contact_job_title = this.placementForm.value.providerContactJobTitle;
      this.placement.placement_provider.contact_email = this.placementForm.value.providerContactEmail;
      this.placement.placement_provider.telephone = this.placementForm.value.providerContactTelephone;

      this.placementService.updatePlacement(this.placement).subscribe({
        next : (placement) => {
          this.placement = placement;
          this.successMessage = 'The placement is updated successfully.';
          this.loadForm();
          window.scrollTo(0, 0);
        },
        error : (error) => {
          this.errorMessage = error.error;
        }
      });
    }
  }

  OnShowBookVisitView(){
    if(this.user?.school != undefined && this.user?.school != null){
      this.placementVisitService.getAvailablePlacementVisitSlots(this.user?.school).subscribe({
        next : (availableSlots) => {
          this.availableSlots = availableSlots;
          this.showBookSlotView = true;
          this.filterSlotsOnDate(this.selectedDate);
        },
        error : (error) => {
          this.errorMessage = error.error;
        }
      });
    }
  }

  OnHideBookVisitView(){
    this.updatePlacementVisit = undefined;
    this.scheduleVisitForm.reset();
    this.showBookSlotView = false;
    this.selectedSlot = undefined;
  }

  selectedVisitDate(value : any){
    this.selectedDate = value;
    if(this.selectedDate != undefined || this.selectedDate != null){
      this.filterSlotsOnDate(this.selectedDate);
    }
  }

  isDateHasSlots(date : Date) : boolean{
    let slotsAvailable = false;
    this.availableSlots.forEach((slot) => {
      if(formatDate(slot.start_time,'yyyy-MM-dd','en-US') === formatDate(date,'yyyy-MM-dd','en-US')) {
        slotsAvailable = true};
    })
    return slotsAvailable;
  }

  filterSlotsOnDate(date : Date) {
    this.filteredSlotsOnDate = this.availableSlots.filter(slot => formatDate(slot.start_time, 'yyyy-MM-dd','en-US') === formatDate(date,'yyyy-MM-dd','en-US'))
  }

  OnBookSlot(slot : VisitingSlot){
    this.scheduleVisitForm.get('visitStartTime')?.setValue(slot.start_time);
    this.scheduleVisitForm.get('visitEndTime')?.setValue(slot.end_time);
    this.selectedSlot = slot;
  }

  OnSchedulePlacement(){

    const request_body = new PlacementVisitRequest(this.updatePlacementVisit?.id,
       this.placement?.id ?? '',
       "Virtual", 
       this.scheduleVisitForm.value.visitStartTime,
       this.scheduleVisitForm.value.visitEndTime,
       this.placement?.student.first_name + ' ' + this.placement?.student.last_name,
       this.placement?.student.email_id ?? '',
       this.placement?.student.school ?? '',
       this.scheduleVisitForm.value.providerContactName,
       this.scheduleVisitForm.value.providerContactEmail
      )

    this.placementVisitService.schedulePlacementVisit(request_body).subscribe({
      next : (placementVisit) => {
        this.successMessage = 'The placement visit is scheduled successfully.';
        window.scrollTo(0, 0);
        this.OnHideBookVisitView();
        this.fetchPlacementVisits();
      },
      error : (error) => {
        this.errorMessage = error.error;
      }
    });

    

  }

  OnVisitChange(visit : PlacementVisit){
    this.scheduleVisitForm.get('providerContactName')?.setValue(visit.provider_contact_name);
    this.scheduleVisitForm.get('providerContactEmail')?.setValue(visit.provider_contact_email);
    this.scheduleVisitForm.get('visitStartTime')?.setValue(visit.start_time);
    this.scheduleVisitForm.get('visitEndTime')?.setValue(visit.end_time);
    this.selectedSlot = new VisitingSlot(visit.start_time, visit.end_time, []);
    this.updatePlacementVisit = visit;
    this.OnShowBookVisitView();
  }

  fetchPlacementVisits() {
    this.placementVisitService.getPlacementVisitsByPlacementId(this.placementId ?? '').subscribe({
      next: (placementVisits) => {
        this.placementVisits = placementVisits;
        this.visitsExists = true;
      },
      error: (error) => {
      }
    });
  }

}
