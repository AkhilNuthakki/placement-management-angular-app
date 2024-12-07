import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { FilterAuthorizationRequest } from 'src/app/interfaces/FilterAuthorizationRequest';
import { PlacementAuthorizationRequest } from 'src/app/interfaces/PlacementAuthRequest';
import { User } from 'src/app/interfaces/User.model';
import { PlacementAuthReqService } from 'src/app/services/placementAuthReqService/placement-auth-req.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent implements OnInit{
  userRole : string | undefined;
  isStudent : boolean = false;
  isTutor : boolean = false;
  isProvider : boolean = false;
  user : User | undefined;
  isRequestsFetched : boolean = false;
  isAuthorizationRequestsExists : boolean = false;
  isFilteredAuthorizationRequestsExists : boolean = false;
  isRequestsFiltered : boolean = false;
  errorMessage : string | undefined;
  placementAuthRequests : PlacementAuthorizationRequest[] = [];
  providerNamesList : string[] = [];

  filterReqForm : FormGroup = new FormGroup({
    providerName : new FormControl(null),
    placementAuthReqStatus : new FormControl('Filter by status'),
    course : new FormControl('Filter by course')
  });

  statusList: string[] = [
    'Pending',
    'Authorized',
    'Rejected'
  ];

  courseList : string[] =[
    'MSc Advanced Computer Science',
    'MSc Cloud Computing',
    'MSc Advanced Software Engineering',
    'MSc Data Analysis for Business Intelligence'
  ];

  constructor(private router : Router, 
    private userService : UserService,
    private placementAuthReqService : PlacementAuthReqService){}


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

    this.placementAuthReqService.getPlacementAuthorizationRequestsByUserId(this.user?.user_id ?? '').subscribe({
      next: (placementAuthReqList) => {
        this.isRequestsFetched = true;
        this.isAuthorizationRequestsExists = true;
        this.placementAuthRequests = placementAuthReqList;
      },
      error : (error) => {
        if(error.status == 404){
          this.isRequestsFetched = true;
          this.isAuthorizationRequestsExists = false;
        }else{
          this.errorMessage = error.error;
        }
      }
    });

    this.placementAuthReqService.getDistinctProviderNames().subscribe({
      next : (providerNamesList) =>{
        this.providerNamesList = providerNamesList;
      }
    })
  }

  raiseAuthorizationRequest(){
    this.router.navigate(['/requests/submit']);
  }

  viewAuthorizationRequest(requestId : string){
    this.router.navigate([`/requests/${requestId}`]);
  }

  viewRequestOverview(requestId : string){
    this.router.navigate([`/request-overview/${requestId}`]);
  }

  viewProviderForm(providerFormId : string | undefined, authRequestId : string){
    if(providerFormId == undefined){
      this.router.navigate(['/provider-form/submit'], { queryParams: {requestId: authRequestId}});
    }else{
      this.router.navigate([`/provider-form/${providerFormId}`], { queryParams: {requestId: authRequestId}});
    }
    
  }

  OnFilter(){

    this.errorMessage = undefined;
    this.placementAuthRequests = [];

    const request_body = new FilterAuthorizationRequest(this.filterReqForm.value.providerName,
      this.filterReqForm.value.placementAuthReqStatus !== 'Filter by status' ? this.filterReqForm.value.placementAuthReqStatus : undefined,
      this.filterReqForm.value.course !== 'Filter by course' ? this.filterReqForm.value.course : undefined
    ); 

    this.placementAuthReqService.filterPlacementAuthorizationRequests(request_body).subscribe({
      next: (placementAuthReqList) => {
        this.isRequestsFiltered = true;
        this.isFilteredAuthorizationRequestsExists = true;
        this.placementAuthRequests = placementAuthReqList;
      },
      error : (error) => {
        if(error.status == 404){
          this.isRequestsFiltered = true;
          this.isFilteredAuthorizationRequestsExists = false;
        }else{
          this.errorMessage = error.error;
        }
      }
    });

  }

  onClearFilter(){
    this.filterReqForm.get('providerName')?.setValue(null);
    this.filterReqForm.get('placementAuthReqStatus')?.setValue('Filter by status');
    this.filterReqForm.get('course')?.setValue('Filter by course');
    this.isRequestsFiltered = false;
    this.isFilteredAuthorizationRequestsExists = false;

    this.placementAuthReqService.getPlacementAuthorizationRequestsByUserId(this.user?.user_id ?? '').subscribe({
      next: (placementAuthReqList) => {
        this.isRequestsFetched = true;
        this.isAuthorizationRequestsExists = true;
        this.placementAuthRequests = placementAuthReqList;
      },
      error : (error) => {
        if(error.status == 404){
          this.isRequestsFetched = true;
          this.isAuthorizationRequestsExists = false;
        }else{
          this.errorMessage = error.error;
        }
      }
    });
  }



}
