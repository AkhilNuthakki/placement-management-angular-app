import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User.model';
import { UserService } from "src/app/services/user/user.service";
import { Router } from "@angular/router";
import { PlacementService } from 'src/app/services/placement/placement.service';
import { Placement } from 'src/app/interfaces/Placement.model';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterPlacement } from 'src/app/interfaces/FilterPlacement';

@Component({
  selector: 'app-placements-list',
  templateUrl: './placements-list.component.html',
  styleUrls: ['./placements-list.component.css']
})
export class PlacementsListComponent implements OnInit{

  userRole : string | undefined;
  isStudent : boolean = false;
  isTutor : boolean = false;
  isProvider : boolean = false;
  user : User | undefined;
  errorMessage : string | undefined;
  arePlacementsAvailable : boolean = false;
  isPlacementsFetched : boolean = false;
  placements : Placement[] = [];


  isPlacementsFiltered : boolean = false;
  isFilteredPlacementsExists : boolean = false;

  filterPlacementForm : FormGroup = new FormGroup({
    providerName : new FormControl(null),
    studentName : new FormControl(null),
    course : new FormControl('Filter by course')
  });

  courseList : string[] =[
    'MSc Advanced Computer Science',
    'MSc Cloud Computing',
    'MSc Advanced Software Engineering',
    'MSc Data Analysis for Business Intelligence'
  ];

  constructor(private userService: UserService,
    private router: Router,
    private placementService: PlacementService) { }

  ngOnInit(): void {
    
    this.errorMessage = undefined;

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

    this.placementService.getPlacementsByUserId(this.user?.user_id ?? '').subscribe({
      next: (placementList) => {
        this.isPlacementsFetched = true;
        this.arePlacementsAvailable = true;
        this.placements = placementList;
      },
      error : (error) => {
        if(error.status == 404){
          this.isPlacementsFetched = true;
          this.arePlacementsAvailable = false;
        }else{
          this.errorMessage = error.error;
        }
      }
    });
    
  }

  viewPlacement(placementId : string){
    this.router.navigate([`placements/${placementId}`]);
  }

  OnFilter(){
    this.errorMessage = undefined;
    this.placements = [];

    const request_body = new FilterPlacement(this.filterPlacementForm.value.providerName,
      this.filterPlacementForm.value.studentName,
      this.filterPlacementForm.value.course !== 'Filter by course' ? this.filterPlacementForm.value.course : undefined
    ); 

    this.placementService.filterPlacements(request_body).subscribe({
      next: (placementList) => {
        this.isPlacementsFiltered = true;
        this.isFilteredPlacementsExists = true;
        this.placements = placementList;
      },
      error : (error) => {
        if(error.status == 404){
          this.isPlacementsFiltered = true;
          this.isFilteredPlacementsExists = false;
        }else{
          this.errorMessage = error.error;
        }
      }
    });

  }

  onClearFilter(){
    this.filterPlacementForm.get('providerName')?.setValue(null);
    this.filterPlacementForm.get('studentName')?.setValue(null);
    this.filterPlacementForm.get('course')?.setValue('Filter by course');
    this.isPlacementsFiltered = false;
    this.isFilteredPlacementsExists = false;

    this.placementService.getPlacementsByUserId(this.user?.user_id ?? '').subscribe({
      next: (placementList) => {
        this.isPlacementsFetched = true;
        this.arePlacementsAvailable = true;
        this.placements = placementList;
      },
      error : (error) => {
        if(error.status == 404){
          this.isPlacementsFetched = true;
          this.arePlacementsAvailable = false;
        }else{
          this.errorMessage = error.error;
        }
      }
    });

  }

}
