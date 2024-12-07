import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacementAuthorizationRequest } from 'src/app/interfaces/PlacementAuthRequest';
import { RegisterProviderRequest } from 'src/app/interfaces/RegisterProviderRequest';
import { User } from 'src/app/interfaces/User.model';
import { PlacementAuthReqService } from 'src/app/services/placementAuthReqService/placement-auth-req.service';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-request-overview',
  templateUrl: './request-overview.component.html',
  styleUrls: ['./request-overview.component.css']
})
export class RequestOverviewComponent implements OnInit{

  placementAuthRequestId: string | undefined;
  errorMessage : string | undefined;
  innerErrorMessage : string | undefined;
  successMessage : string | undefined;
  placementAuthorizationRequest: PlacementAuthorizationRequest | undefined;
  userRole : string | undefined;
  isStudent : boolean = false;
  isTutor : boolean = false;
  isProvider : boolean = false;
  user : User | undefined;
  viewAuthorizationRequestComponent : boolean = false;
  viewProviderFormComponent : boolean = false;
  viewAssessmentFormComponent : boolean = false;
  viewRegisterAndNotifyProviderComponent : boolean = false;
  currentStage : number = 1;

  constructor(private route : ActivatedRoute, 
    private placementAuthReqService : PlacementAuthReqService,
    private providerService : ProviderService,
    private userService : UserService) {}

  ngOnInit() {
    this.errorMessage = undefined;
    this.successMessage = undefined;
    this.innerErrorMessage = undefined;

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
      this.placementAuthRequestId = params.get('id') ?? undefined;

      if(this.placementAuthRequestId != undefined || this.placementAuthRequestId != null){
        this.getPlacementAuthorizationRequest(this.placementAuthRequestId);
      }
    });

  }

  viewAuthorizationRequest(){
    this.viewAuthorizationRequestComponent = true;

    this.viewProviderFormComponent = false;
    this.viewAssessmentFormComponent = false;
    this.viewRegisterAndNotifyProviderComponent = false;
    this.errorMessage = undefined;
    this.successMessage = undefined;
    this.innerErrorMessage = undefined;
  }
  
  viewProviderForm(){
    this.viewProviderFormComponent = true;

    this.viewAuthorizationRequestComponent = false;
    this.viewAssessmentFormComponent = false;
    this.viewRegisterAndNotifyProviderComponent = false;
    this.errorMessage = undefined;
    this.successMessage = undefined;
    this.innerErrorMessage = undefined;
    
  }

  viewAssessmentForm() {
    this.viewAssessmentFormComponent = true;

    this.viewAuthorizationRequestComponent = false;
    this.viewProviderFormComponent = false;
    this.viewRegisterAndNotifyProviderComponent = false;
    this.errorMessage = undefined;
    this.successMessage = undefined;
    this.innerErrorMessage = undefined;
  }

  viewRegisterAndNotifyProvider() {
    this.viewRegisterAndNotifyProviderComponent = true;

    this.viewAuthorizationRequestComponent = false;
    this.viewProviderFormComponent = false;
    this.viewAssessmentFormComponent = false;
    this.errorMessage = undefined;
    this.successMessage = undefined;
    this.innerErrorMessage = undefined;
  }

  registerAndNotifyProvider(){

    const request_body = new RegisterProviderRequest(this.placementAuthorizationRequest?.placement_provider?.contact_name,
      this.placementAuthorizationRequest?.placement_provider.contact_email,
      this.placementAuthorizationRequest?.id
    )

    this.providerService.registerAndNotifyProvider(request_body).subscribe({
      next : (user) => {
        if(user.email_id === request_body.user_email_id){
          this.successMessage = 'Provider is registered and notified regarding the placement authorization request';
          if(this.placementAuthRequestId != undefined || this.placementAuthRequestId != null){
            this.getPlacementAuthorizationRequest(this.placementAuthRequestId);
          }
        }
      },
      error : (error) => {
        this.innerErrorMessage = error.error;
      }
    })
  }

  getPlacementAuthorizationRequest(placementAuthRequestId : string){
    this.placementAuthReqService.getPlacementAuthorizationRequestsById(placementAuthRequestId).subscribe({
      next : (placementAuthReq) => {
        this.placementAuthorizationRequest = placementAuthReq;
        this.findCurrentStage();
      },
      error : (error) => {
        this.errorMessage = error.error;
      }
    });
  }


  findCurrentStage(){
    this.currentStage = 1;
    if(this.placementAuthorizationRequest?.request_submission_status == 'SUBMITTED'){
      this.currentStage = 2;
    }
    if(this.placementAuthorizationRequest?.provider_registration_status == 'REGISTERED'){
      this.currentStage = 3;
    }
    if(this.placementAuthorizationRequest?.provider_form_submission_status == 'SUBMITTED'){
      this.currentStage = 4;
    }
    if(this.placementAuthorizationRequest?.tutor_assessment_submission_status == 'SUBMITTED'){
      this.currentStage = 5;
    }
  }
}
