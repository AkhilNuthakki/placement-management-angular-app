import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HealthFactor } from "src/app/interfaces/HealthFactor.model";
import { LocationAndRegionFactor } from "src/app/interfaces/LocationAndRegionFactor.model";
import { PersonalFactor } from "src/app/interfaces/PersonalFactor.model";
import { PlacementAuthorizationRequest } from "src/app/interfaces/PlacementAuthRequest";
import { PlacementProvider } from "src/app/interfaces/PlacementProvider.model";
import { PlacementRole } from "src/app/interfaces/PlacementRole.model";
import { PoliciesAndInsuranceFactor } from "src/app/interfaces/PoliciesAndInsurnace.model";
import { Student } from "src/app/interfaces/Student.model";
import { TravelFactor } from "src/app/interfaces/TravelFactor.model";
import { User } from "src/app/interfaces/User.model";
import { WorkFactor } from "src/app/interfaces/WorkFactor.model";
import { PlacementAuthReqService } from "src/app/services/placementAuthReqService/placement-auth-req.service";
import { UserService } from "src/app/services/user/user.service";
import { OnFormControlValueChange } from "src/app/validators/OnFormControlValueChange";
import { ActivatedRoute } from "@angular/router";
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-authorization-request-form',
  templateUrl: './authorization-request-form.component.html',
  styleUrls: ['./authorization-request-form.component.css']
})
export class AuthorizationRequestFormComponent implements OnInit {

  @Input() placementAuthorizationRequest: PlacementAuthorizationRequest | undefined;

  errorMessage: string | undefined;
  successMessage: string | undefined;
  user: User | undefined;
  minRoleStartDate: Date = new Date();
  requestBody: PlacementAuthorizationRequest | undefined;
  placementAuthRequestId: string | undefined;
  viewMode : boolean = false;
  visaContactEmail : string = 'visas@leicester.ac.uk';


  authReqForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    studentNumber: new FormControl(null, Validators.required),
    useremail: new FormControl(null, [Validators.required, Validators.email]),
    course: new FormControl(null, Validators.required),
    school: new FormControl(null, Validators.required),
    telephone: new FormControl(null, Validators.required),
    isInternationalStudent: new FormControl(null, Validators.required),
    isVisaAvailableDuringPlacement: new FormControl(null),
    providerName: new FormControl(null, Validators.required),
    providerWebAddress: new FormControl(null, Validators.required),
    providerAddress: new FormControl(null, Validators.required),
    providerPostcode: new FormControl(null, Validators.required),
    providerContactName: new FormControl(null, Validators.required),
    providerContactEmail: new FormControl(null, [Validators.required, Validators.email]),
    providerContactJobTitle: new FormControl(null, Validators.required),
    providerTelephone: new FormControl(null, Validators.required),
    placementRoleTitle: new FormControl(null, Validators.required),
    placementStartDate: new FormControl(null, Validators.required),
    placementEndDate: new FormControl(null, Validators.required),
    workingHours: new FormControl(null, [Validators.required, Validators.min(35), Validators.max(48)]),
    hasProbationPeriod: new FormControl(null, Validators.required),
    probationPeriodInWeeks: new FormControl(null),
    salary: new FormControl(null, Validators.required),
    sourceOfRole: new FormControl(null, Validators.required),
    otherSourceOfRole: new FormControl(null),
    hasInformedProvider: new FormControl(null, Validators.required),
    roleDescription: new FormControl(null, Validators.required),
    isWorkFromHome: new FormControl(null, Validators.required),
    remoteWorkOverview: new FormControl(null),
    whyItHasRemoteWork: new FormControl(null),
    TravelToPlacement: new FormControl(null, Validators.required),
    OtherTravelToPlacementDescription: new FormControl(null),
    isWorkingInDifferentLocation: new FormControl(null, Validators.required),
    otherAddress: new FormControl(null),
    isRequiredOverseasTravel: new FormControl(null, Validators.required),
    hasReadOverseasTravelGuidance: new FormControl(null),
    hasConsideredHowToTravelOverseas: new FormControl(null),
    accommodationArrangements: new FormControl(null, Validators.required),
    otherAccommodationArrangements: new FormControl(null),
    hasCheckedWithFCDO: new FormControl(null),
    isAwareOfAnyRisksAtLocation: new FormControl(null),
    risksAtLocation: new FormControl(null),
    isAwareOfPreCautionaryMeasures: new FormControl(null, Validators.required),
    preCautionaryMeasures: new FormControl(null),
    hasDownloadedSafeZoneApp: new FormControl(null, Validators.required),
    hasAppliedGlobalHealthInsuranceCard: new FormControl(null, Validators.required),
    hasConsideredAnyAdjustments: new FormControl(null, Validators.required),
    isAwareOfTravelRequestForm: new FormControl(null),
    isWorkCountryListedOnRiskAssessmentEscalation: new FormControl(null)
  })

  sourceRoleList: string[] = [
    'My Careers',
    'Placements Bulletin',
    'School staff',
    'Fellow student',
    'Festival of Careers',
    'Other employer event at the university',
    'Jobs Board (Prospects etc.)',
    'LinkedIn',
    'Indeed',
    'Family/firend outside university',
    'Other'
  ];

  courseList : string[] =[
    'MSc Advanced Computer Science',
    'MSc Cloud Computing',
    'MSc Advanced Software Engineering',
    'MSc Data Analysis for Business Intelligence'
  ];

  travelWaysList: string[] = [
    'Own vehicle',
    'Public transport (bus, taxi)',
    'Walking',
    'Cycle',
    'Other'
  ];

  accommodationArrangementsList: string[] = [
    'Rent shared house',
    'Rent individual house',
    'Live at home',
    'Other'
  ];

  constructor(private placementAuthReqService: PlacementAuthReqService,
    private userService: UserService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.errorMessage = undefined;
    this.successMessage = undefined;
    //Role Start Date atleast 10 days from today
    this.minRoleStartDate.setDate(this.minRoleStartDate.getDate() + 10);

    if (this.placementAuthorizationRequest == null || this.placementAuthorizationRequest == undefined) {
      this.route.paramMap.subscribe(params => {
        this.placementAuthRequestId = params.get('id') ?? undefined;
  
        if(this.placementAuthRequestId != undefined || this.placementAuthRequestId != null){
          this.placementAuthReqService.getPlacementAuthorizationRequestsById(this.placementAuthRequestId).subscribe({
            next : (placementAuthReq) => {
              this.placementAuthorizationRequest = placementAuthReq;
              this.loadForm();
            },
            error : (error) => {
              this.errorMessage = error.error;
            }
          });
        }
      });
    }else{
      this.loadForm();
    }

    if (this.placementAuthorizationRequest == null || this.placementAuthorizationRequest == undefined) {
      this.userService.getUser().subscribe({
        next: (user) => {
          if (user) {
            this.user = user;
            this.authReqForm.get('firstName')?.setValue(this.user.first_name);
            this.authReqForm.get('lastName')?.setValue(this.user.last_name);
            this.authReqForm.get('useremail')?.setValue(this.user.email_id);
            this.authReqForm.get('school')?.setValue(this.user.school);
          }
        }
      })
    }

    //Adding Dynamic Custom Validations
    OnFormControlValueChange(this.authReqForm, 'isInternationalStudent', 'Yes', 'isVisaAvailableDuringPlacement');
    OnFormControlValueChange(this.authReqForm, 'hasProbationPeriod', 'Yes', 'probationPeriodInWeeks');
    OnFormControlValueChange(this.authReqForm, 'sourceOfRole', 'Other', 'otherSourceOfRole');
    OnFormControlValueChange(this.authReqForm, 'isWorkFromHome', 'Yes', 'remoteWorkOverview');
    OnFormControlValueChange(this.authReqForm, 'isWorkFromHome', 'Yes', 'whyItHasRemoteWork');
    OnFormControlValueChange(this.authReqForm, 'TravelToPlacement', 'Other', 'OtherTravelToPlacementDescription');
    OnFormControlValueChange(this.authReqForm, 'isWorkingInDifferentLocation', 'Yes', 'otherAddress');
    OnFormControlValueChange(this.authReqForm, 'isRequiredOverseasTravel', 'Yes', 'hasReadOverseasTravelGuidance');
    OnFormControlValueChange(this.authReqForm, 'isRequiredOverseasTravel', 'Yes', 'hasConsideredHowToTravelOverseas');
    OnFormControlValueChange(this.authReqForm, 'accommodationArrangements', 'Other', 'otherAccommodationArrangements');
    OnFormControlValueChange(this.authReqForm, 'isRequiredOverseasTravel', 'Yes', 'hasCheckedWithFCDO');
    OnFormControlValueChange(this.authReqForm, 'isRequiredOverseasTravel', 'Yes', 'isAwareOfAnyRisksAtLocation');
    OnFormControlValueChange(this.authReqForm, 'isAwareOfAnyRisksAtLocation', 'Yes', 'risksAtLocation');
    OnFormControlValueChange(this.authReqForm, 'isAwareOfPreCautionaryMeasures', 'Yes', 'preCautionaryMeasures');
    OnFormControlValueChange(this.authReqForm, 'isRequiredOverseasTravel', 'Yes', 'hasAppliedGlobalHealthInsuranceCard');
    OnFormControlValueChange(this.authReqForm, 'isRequiredOverseasTravel', 'Yes', 'isAwareOfTravelRequestForm');
    OnFormControlValueChange(this.authReqForm, 'isRequiredOverseasTravel', 'Yes', 'isWorkCountryListedOnRiskAssessmentEscalation');
  }

  onSubmit() {
    this.errorMessage = undefined;
    this.successMessage = undefined;
    const requestBody = this.createRequestBody();

    this.placementAuthReqService.submitPlacementAuthorizationRequest(requestBody).subscribe({
      next: (PlacementAuthorizationRequest) => {
        this.placementAuthorizationRequest = PlacementAuthorizationRequest;
        this.successMessage = 'The request is submmitted successfully. You can track the status from My Requests page';
        this.onViewMode();
        window.scrollTo(0, 0);
      },
      error: (error) => {
        this.errorMessage = error.error;
        window.scrollTo(0, 0);
      }
    });

  }

  onSave() {
    this.errorMessage = undefined;
    this.successMessage = undefined;
    const requestBody = this.createRequestBody();

    this.placementAuthReqService.savePlacementAuthorizationRequest(requestBody).subscribe({
      next: (PlacementAuthorizationRequest) => {
        this.successMessage = 'The request is saved successfully. The request will be not processed until it is submmited.';
        this.placementAuthorizationRequest = PlacementAuthorizationRequest;
        window.scrollTo(0, 0);
      },
      error: (error) => {
        this.errorMessage = error.error;
        window.scrollTo(0, 0);
      }
    });

  }

  createRequestBody(): PlacementAuthorizationRequest {
    const student = new Student(this.authReqForm.value.firstName,
      this.authReqForm.value.lastName,
      this.authReqForm.value.studentNumber,
      this.authReqForm.value.useremail,
      this.authReqForm.value.course,
      this.authReqForm.value.school,
      this.authReqForm.value.telephone,
      '',
      this.authReqForm.value.isInternationalStudent,
      this.authReqForm.value.isVisaAvailableDuringPlacement
    );

    const placement_provider = new PlacementProvider(this.authReqForm.value.providerName,
      this.authReqForm.value.providerAddress,
      this.authReqForm.value.providerWebAddress,
      this.authReqForm.value.providerPostcode,
      this.authReqForm.value.providerContactName,
      this.authReqForm.value.providerContactEmail,
      this.authReqForm.value.providerContactJobTitle,
      this.authReqForm.value.providerTelephone,
      '',
      ''
    );

    const placement_role = new PlacementRole(this.authReqForm.value.placementRoleTitle,
      this.authReqForm.value.placementStartDate,
      this.authReqForm.value.placementEndDate,
      this.authReqForm.value.workingHours,
      this.authReqForm.value.hasProbationPeriod,
      this.authReqForm.value.probationPeriodInWeeks,
      this.authReqForm.value.salary,
      this.authReqForm.value.sourceOfRole,
      this.authReqForm.value.otherSourceOfRole,
      this.authReqForm.value.hasInformedProvider,
      this.authReqForm.value.roleDescription
    )

    const work_factor = new WorkFactor(this.authReqForm.value.isWorkFromHome,
      this.authReqForm.value.remoteWorkOverview,
      this.authReqForm.value.whyItHasRemoteWork
    );

    const travel_factor = new TravelFactor(this.authReqForm.value.isWorkingInDifferentLocation,
      this.authReqForm.value.otherAddress,
      this.authReqForm.value.isRequiredOverseasTravel,
      this.authReqForm.value.hasReadOverseasTravelGuidance,
      this.authReqForm.value.hasConsideredHowToTravelOverseas,
      this.authReqForm.value.OtherTravelToPlacementDescription,
      this.authReqForm.value.TravelToPlacement
    )

    const location_and_region_factor = new LocationAndRegionFactor(this.authReqForm.value.accommodationArrangements,
      this.authReqForm.value.otherAccommodationArrangements,
      this.authReqForm.value.hasCheckedWithFCDO,
      this.authReqForm.value.isAwareOfAnyRisksAtLocation,
      this.authReqForm.value.risksAtLocation,
      undefined
    );

    const health_factor = new HealthFactor(this.authReqForm.value.isAwareOfPreCautionaryMeasures,
      this.authReqForm.value.preCautionaryMeasures,
      this.authReqForm.value.hasDownloadedSafeZoneApp,
      this.authReqForm.value.hasAppliedGlobalHealthInsuranceCard
    );

    const personal_factor = new PersonalFactor(this.authReqForm.value.hasConsideredAnyAdjustments);

    const policies_and_insurance_factor = new PoliciesAndInsuranceFactor(this.authReqForm.value.isAwareOfTravelRequestForm,
      this.authReqForm.value.isWorkCountryListedOnRiskAssessmentEscalation
    );

    const requestBody = new PlacementAuthorizationRequest(this.placementAuthorizationRequest?.id ?? '',
      this.user?.user_id ?? '',
      student,
      placement_provider,
      placement_role,
      work_factor,
      travel_factor,
      location_and_region_factor,
      health_factor,
      personal_factor,
      policies_and_insurance_factor);

    return requestBody;
  }

  loadForm() {
    //Load Students Details
    this.authReqForm.get('firstName')?.setValue(this.placementAuthorizationRequest?.student.first_name);
    this.authReqForm.get('lastName')?.setValue(this.placementAuthorizationRequest?.student.last_name);
    this.authReqForm.get('studentNumber')?.setValue(this.placementAuthorizationRequest?.student.student_number);
    this.authReqForm.get('useremail')?.setValue(this.placementAuthorizationRequest?.student.email_id);
    this.authReqForm.get('course')?.setValue(this.placementAuthorizationRequest?.student.course);
    this.authReqForm.get('school')?.setValue(this.placementAuthorizationRequest?.student.school);
    this.authReqForm.get('telephone')?.setValue(this.placementAuthorizationRequest?.student.telephone);
    this.authReqForm.get('isInternationalStudent')?.setValue(this.placementAuthorizationRequest?.student.is_international_student);
    this.authReqForm.get('isVisaAvailableDuringPlacement')?.setValue(this.placementAuthorizationRequest?.student.is_visa_available_during_placement);

    //Load Provider Details
    this.authReqForm.get('providerName')?.setValue(this.placementAuthorizationRequest?.placement_provider.name);
    this.authReqForm.get('providerWebAddress')?.setValue(this.placementAuthorizationRequest?.placement_provider.web_address);
    this.authReqForm.get('providerAddress')?.setValue(this.placementAuthorizationRequest?.placement_provider.address);
    this.authReqForm.get('providerPostcode')?.setValue(this.placementAuthorizationRequest?.placement_provider.postcode);
    this.authReqForm.get('providerContactName')?.setValue(this.placementAuthorizationRequest?.placement_provider.contact_name);
    this.authReqForm.get('providerContactEmail')?.setValue(this.placementAuthorizationRequest?.placement_provider.contact_email);
    this.authReqForm.get('providerContactJobTitle')?.setValue(this.placementAuthorizationRequest?.placement_provider.contact_job_title);
    this.authReqForm.get('providerTelephone')?.setValue(this.placementAuthorizationRequest?.placement_provider.telephone);

    //Load Placement role Details
    this.authReqForm.get('placementRoleTitle')?.setValue(this.placementAuthorizationRequest?.placement_role.title);
    this.authReqForm.get('placementStartDate')?.setValue(formatDate(this.placementAuthorizationRequest?.placement_role.start_date ?? '','yyyy-MM-dd','en-US'));
    this.authReqForm.get('placementEndDate')?.setValue(formatDate(this.placementAuthorizationRequest?.placement_role.end_date ?? '','yyyy-MM-dd','en-US'));
    this.authReqForm.get('workingHours')?.setValue(this.placementAuthorizationRequest?.placement_role.working_hours);
    this.authReqForm.get('hasProbationPeriod')?.setValue(this.placementAuthorizationRequest?.placement_role.has_probation_period);
    this.authReqForm.get('probationPeriodInWeeks')?.setValue(this.placementAuthorizationRequest?.placement_role.probation_period_in_weeks);
    this.authReqForm.get('salary')?.setValue(this.placementAuthorizationRequest?.placement_role.salary);
    this.authReqForm.get('sourceOfRole')?.setValue(this.placementAuthorizationRequest?.placement_role.source_of_role);
    this.authReqForm.get('otherSourceOfRole')?.setValue(this.placementAuthorizationRequest?.placement_role.other_source_of_role);
    this.authReqForm.get('hasInformedProvider')?.setValue(this.placementAuthorizationRequest?.placement_role.has_informed_provider);
    this.authReqForm.get('roleDescription')?.setValue(this.placementAuthorizationRequest?.placement_role.role_description);

    //Load Work Factor Details
    this.authReqForm.get('isWorkFromHome')?.setValue(this.placementAuthorizationRequest?.work_factor.is_work_from_home);
    this.authReqForm.get('remoteWorkOverview')?.setValue(this.placementAuthorizationRequest?.work_factor.remote_work_overview);
    this.authReqForm.get('whyItHasRemoteWork')?.setValue(this.placementAuthorizationRequest?.work_factor.why_it_has_remote_work);

    //Load Travel Factor Details
    this.authReqForm.get('TravelToPlacement')?.setValue(this.placementAuthorizationRequest?.travel_factor.travel_to_placement);
    this.authReqForm.get('OtherTravelToPlacementDescription')?.setValue(this.placementAuthorizationRequest?.travel_factor.other_travel_to_placement);
    this.authReqForm.get('isWorkingInDifferentLocation')?.setValue(this.placementAuthorizationRequest?.travel_factor.is_working_in_different_location);
    this.authReqForm.get('otherAddress')?.setValue(this.placementAuthorizationRequest?.travel_factor.other_address);
    this.authReqForm.get('isRequiredOverseasTravel')?.setValue(this.placementAuthorizationRequest?.travel_factor.is_required_overseas_travel);
    this.authReqForm.get('hasReadOverseasTravelGuidance')?.setValue(this.placementAuthorizationRequest?.travel_factor.has_read_overseas_travel_guidance);
    this.authReqForm.get('hasConsideredHowToTravelOverseas')?.setValue(this.placementAuthorizationRequest?.travel_factor.has_considered_how_to_travel_overseas);

    //Load Location and region Factors Details
    this.authReqForm.get('accommodationArrangements')?.setValue(this.placementAuthorizationRequest?.location_and_region_factor.accommodation_arrangements);
    this.authReqForm.get('otherAccommodationArrangements')?.setValue(this.placementAuthorizationRequest?.location_and_region_factor.other_accommodation_arrangements);
    this.authReqForm.get('hasCheckedWithFCDO')?.setValue(this.placementAuthorizationRequest?.location_and_region_factor.has_checked_with_fcdo);
    this.authReqForm.get('isAwareOfAnyRisksAtLocation')?.setValue(this.placementAuthorizationRequest?.location_and_region_factor.is_aware_of_any_risks_at_location);
    this.authReqForm.get('risksAtLocation')?.setValue(this.placementAuthorizationRequest?.location_and_region_factor.risks_at_location);

    //Load Health Factors Details
    this.authReqForm.get('isAwareOfPreCautionaryMeasures')?.setValue(this.placementAuthorizationRequest?.health_factor.is_aware_of_pre_cautionary_measures);
    this.authReqForm.get('preCautionaryMeasures')?.setValue(this.placementAuthorizationRequest?.health_factor.pre_cautionary_measures);
    this.authReqForm.get('hasDownloadedSafeZoneApp')?.setValue(this.placementAuthorizationRequest?.health_factor.has_downloaded_safe_zone_app);
    this.authReqForm.get('hasAppliedGlobalHealthInsuranceCard')?.setValue(this.placementAuthorizationRequest?.health_factor.has_applied_global_health_insurance_card);

    //Load Personal Factor Details
    this.authReqForm.get('hasConsideredAnyAdjustments')?.setValue(this.placementAuthorizationRequest?.personal_factor.has_considered_any_adjustments);

    //Load Policies and Insurance Factor Details
    this.authReqForm.get('isAwareOfTravelRequestForm')?.setValue(this.placementAuthorizationRequest?.health_factor.has_applied_global_health_insurance_card);
    this.authReqForm.get('isWorkCountryListedOnRiskAssessmentEscalation')?.setValue(this.placementAuthorizationRequest?.health_factor.has_applied_global_health_insurance_card);

    if(this.placementAuthorizationRequest?.request_submission_status != 'DRAFT'){
      this.onViewMode();
    }
  }

  onViewMode(){
    this.viewMode = true;
    this.authReqForm.disable();
  }

}


