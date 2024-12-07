import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RequestCountGroupByStatus } from 'src/app/interfaces/RequestCountGroupByStatus.model';
import { HealthFactorAssessment } from 'src/app/interfaces/HealthFactorAssessment.model';
import { InfoMatchAssessment } from 'src/app/interfaces/InfoMatchAssessment.model';
import { LocationFactorAssessment } from 'src/app/interfaces/LocationFactorAssessment.model';
import { MatchInfoAssessmentResponse } from 'src/app/interfaces/MatchInfoAssessmentResponse.Model';
import { PersonalFactorAssessment } from 'src/app/interfaces/PersonalFactorAssessment.model';
import { PlacementAssessment } from 'src/app/interfaces/PlacementAssessment';
import { PoliciesAndInsuranceAssessment } from 'src/app/interfaces/PoliciesAndInsuranceAssessment.model';
import { ProviderAssessment } from 'src/app/interfaces/ProviderAssessment.model';
import { RoleAssessment } from 'src/app/interfaces/RoleAssessment.model';
import { TravelFactorAssessment } from 'src/app/interfaces/TravelFactorAssessment.model';
import { UniversityAccessSupportAssessment } from 'src/app/interfaces/UniversityAccessSupportAssessment.model';
import { WorkFactorAssessment } from 'src/app/interfaces/WorkFactorAssessment.model';
import { AssessmentService } from 'src/app/services/assessment/assessment.service';
import { OnFormControlValueChange } from 'src/app/validators/OnFormControlValueChange';
import { AutoFillAssessmentFormResponse } from 'src/app/interfaces/AutoFillAssessmentFormResponse';

@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.css']
})
export class AssessmentFormComponent implements OnInit{
  @Input() placementRequestId : string | undefined;
  @Input() assessmentId: string | undefined;
  @Input() studentName : string | undefined;

  @Output() getPlacementAssessmentById = new EventEmitter<string>();

  errorMessage: string | undefined;
  successMessage: string | undefined;
  requestBody: PlacementAssessment | undefined;
  placementAssessment: PlacementAssessment | undefined;
  viewMode : boolean = false;
  matchInfoAssessmentView : boolean = false;
  matchInfoErroMessage : string | undefined;
  matchInfoAssessmentResponse : MatchInfoAssessmentResponse[] = [];
  flagsView : boolean = false;
  flagsErrorMessage : string | undefined;
  anyFlags : boolean = false;
  flagsForProvider : RequestCountGroupByStatus[] = [];
  autoFillAssessmentFormResponse : AutoFillAssessmentFormResponse | undefined;

  assessmentReqForm : FormGroup = new FormGroup({
    studentName: new FormControl(null, Validators.required),
    providerName: new FormControl(null, Validators.required),
    impactUniversityReputation : new FormControl(null, Validators.required),
    isStudentNameAndProviderAddressMatched : new FormControl(null, Validators.required),
    hasMetDurationHoursRequirements : new FormControl(null, Validators.required),
    hasMetMinimumAcademicRequirements : new FormControl(null, Validators.required),
    hasProviderCompliedWithResponsibilities : new FormControl(null, Validators.required),
    hasConfidenceOnProvider : new FormControl(null, Validators.required),
    isStudentVisaValid : new FormControl(null, Validators.required),
    hasRoleDateComplyWithVisa : new FormControl(null, Validators.required),
    organizationWorkingConditions : new FormControl(null, Validators.required),
    willProvideTrainingToStudents : new FormControl(null, Validators.required),
    isStudentWorkFromHome : new FormControl(null, Validators.required),
    isInvolvesInternationalRemoteWorking : new FormControl(null, Validators.required),
    hasTravelIssues : new FormControl(null, Validators.required),
    isRequiredToWorkAcrossMultipleSites : new FormControl(null, Validators.required),
    hasAnyRisksAtLocation : new FormControl(null, Validators.required),
    hasInappropriateAccommodation : new FormControl(null, Validators.required),
    isStudentRequiredToTakeAnyMeasures : new FormControl(null, Validators.required),
    hasStudentPersonalFactorsImplicates : new FormControl(null, Validators.required),
    hasPublicLiabilityInsurance : new FormControl(null, Validators.required),
    hasEmployerLiabilityInsurance : new FormControl(null, Validators.required),
    doesHoldIndemnityInsurance : new FormControl(null, Validators.required),
    hasHealthAndSafetyPolicy : new FormControl(null, Validators.required),
    hasProviderHasAnyObligationsToVisits : new FormControl(null, Validators.required),
    hasAnyIssuesRelatedToConfidentiality : new FormControl(null, Validators.required),
    placementAuthorizationRequestStatus : new FormControl(null, Validators.required),
    authorizationComments : new FormControl(null),
  });

  constructor(private assessmentService: AssessmentService,
    private route: ActivatedRoute){}

    ngOnInit(): void {
      this.errorMessage = undefined;
      this.successMessage = undefined;
      this.matchInfoAssessmentView = false;
      this.flagsView = false;

      this.assessmentReqForm.get('studentName')?.setValue(this.studentName);

      if(this.assessmentId != undefined || this.assessmentId != null){
        this.assessmentService.getPlacementAssessmentById(this.assessmentId).subscribe({
          next : (placementAssessment) => {
            this.placementAssessment = placementAssessment;
            this.loadForm();
          },
          error : (error) => {
            this.errorMessage = error.error;
          }
        });
      }

      //Adding Dynamic Custom Validations
      this.assessmentReqForm.get('placementAuthorizationRequestStatus')?.valueChanges.subscribe(value => {
      if(value === 'REJECTED' || value === 'ONHOLD'){
          this.assessmentReqForm.get('authorizationComments')?.addValidators(Validators.required);
        }else{
          this.assessmentReqForm.get('authorizationComments')?.clearValidators();
        }
        this.assessmentReqForm.get('authorizationComments')?.updateValueAndValidity();
      });
    }


    onSubmit() {
      this.errorMessage = undefined;
      this.successMessage = undefined;
      const requestBody = this.createRequestBody();
  
      this.assessmentService.submitPlacementAssessment(requestBody).subscribe({
        next: (placementAssessment) => {
          this.placementAssessment = placementAssessment;
          this.successMessage = 'The assessment is submmitted successfully.';
          if(this.placementAssessment?.status != 'DRAFT' && this.placementAssessment?.placement_authorization_request_status != 'ONHOLD'){
            this.onViewMode();
          }
          window.scrollTo(0, 0);
          this.getPlacementAssessmentById.emit(this.placementRequestId);
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
  
      this.assessmentService.savePlacementAssessment(requestBody).subscribe({
        next: (placementAssessment) => {
          this.successMessage = 'These assessment details are saved successfully. This request will be not authorized/rejected until it is submmited.';
          this.placementAssessment = placementAssessment;
          this.getPlacementAssessmentById.emit(this.placementRequestId);
          window.scrollTo(0, 0);
        },
        error: (error) => {
          this.errorMessage = error.error;
          window.scrollTo(0, 0);
        }
      });
    }

    createRequestBody() : PlacementAssessment {

      const provider_assessment = new ProviderAssessment(
        this.assessmentReqForm.value.providerName,
        this.assessmentReqForm.value.impactUniversityReputation,
      );

      const info_match_assessment = new InfoMatchAssessment(this.assessmentReqForm.value.isStudentNameAndProviderAddressMatched);

      const role_assessment = new RoleAssessment(
        this.assessmentReqForm.value.hasMetDurationHoursRequirements,
        this.assessmentReqForm.value.hasMetMinimumAcademicRequirements,
        this.assessmentReqForm.value.hasProviderCompliedWithResponsibilities,
        this.assessmentReqForm.value.hasConfidenceOnProvider,
        this.assessmentReqForm.value.isStudentVisaValid,
        this.assessmentReqForm.value.hasRoleDateComplyWithVisa
      );

      const work_factor_assessment = new WorkFactorAssessment(
        this.assessmentReqForm.value.organizationWorkingConditions,
        this.assessmentReqForm.value.willProvideTrainingToStudents,
        this.assessmentReqForm.value.isStudentWorkFromHome,
        this.assessmentReqForm.value.isInvolvesInternationalRemoteWorking
      );

      const travel_factor_assessment = new TravelFactorAssessment(
        this.assessmentReqForm.value.hasTravelIssues,
        this.assessmentReqForm.value.isRequiredToWorkAcrossMultipleSites
      );

      const location_factor_assessment = new LocationFactorAssessment(
        this.assessmentReqForm.value.hasAnyRisksAtLocation,
        this.assessmentReqForm.value.hasInappropriateAccommodation
      );

      const health_factor_assessment = new HealthFactorAssessment(
        this.assessmentReqForm.value.isStudentRequiredToTakeAnyMeasures
      );

      const personal_factor_assessment = new PersonalFactorAssessment(
        this.assessmentReqForm.value.hasStudentPersonalFactorsImplicates
      );

      const policies_and_insurance_assessment = new PoliciesAndInsuranceAssessment(
        this.assessmentReqForm.value.hasPublicLiabilityInsurance,
        this.assessmentReqForm.value.hasEmployerLiabilityInsurance,
        this.assessmentReqForm.value.doesHoldIndemnityInsurance,
        this.assessmentReqForm.value.hasHealthAndSafetyPolicy
      );

      const university_access_support_assessment = new UniversityAccessSupportAssessment(
        this.assessmentReqForm.value.hasProviderHasAnyObligationsToVisits,
        this.assessmentReqForm.value.hasAnyIssuesRelatedToConfidentiality
      );

      const requestBody = new PlacementAssessment(
        this.placementAssessment?.id ?? '',
        this.placementRequestId ?? '',
        this.studentName ?? '',
        provider_assessment,
        info_match_assessment,
        role_assessment,
        work_factor_assessment,
        travel_factor_assessment,
        location_factor_assessment,
        health_factor_assessment,
        personal_factor_assessment,
        policies_and_insurance_assessment,
        university_access_support_assessment,
        this.assessmentReqForm.value.placementAuthorizationRequestStatus,
        this.assessmentReqForm.value.authorizationComments
      );

      return requestBody;
    }

    onViewMode(){
      this.viewMode = true;
      this.assessmentReqForm.disable();
    }

    loadForm(){

      
      //Load Provider Assesment
      this.assessmentReqForm.get('providerName')?.setValue(this.placementAssessment?.provider_assessment.organization_name);
      this.assessmentReqForm.get('impactUniversityReputation')?.setValue(this.placementAssessment?.provider_assessment.impact_university_reputation);

      //Load Info Match Assesment
      this.assessmentReqForm.get('isStudentNameAndProviderAddressMatched')?.setValue(this.placementAssessment?.info_match_assessment.is_student_name_and_provider_address_matched);

      //Load Role Assesment
      this.assessmentReqForm.get('hasMetDurationHoursRequirements')?.setValue(this.placementAssessment?.role_assessment.has_met_duration_hours_requirements);
      this.assessmentReqForm.get('hasMetMinimumAcademicRequirements')?.setValue(this.placementAssessment?.role_assessment.has_met_minimum_academic_requirements);
      this.assessmentReqForm.get('hasProviderCompliedWithResponsibilities')?.setValue(this.placementAssessment?.role_assessment.has_provider_complied_with_responsibilities);
      this.assessmentReqForm.get('hasConfidenceOnProvider')?.setValue(this.placementAssessment?.role_assessment.has_confidence_on_provider);
      this.assessmentReqForm.get('isStudentVisaValid')?.setValue(this.placementAssessment?.role_assessment.is_student_visa_valid);
      this.assessmentReqForm.get('hasRoleDateComplyWithVisa')?.setValue(this.placementAssessment?.role_assessment.has_role_date_comply_with_visa);
      
      //Load Work Factor Assesment
      this.assessmentReqForm.get('organizationWorkingConditions')?.setValue(this.placementAssessment?.work_factor_assessment.organization_working_conditions);
      this.assessmentReqForm.get('willProvideTrainingToStudents')?.setValue(this.placementAssessment?.work_factor_assessment.will_provide_training_to_students);
      this.assessmentReqForm.get('isStudentWorkFromHome')?.setValue(this.placementAssessment?.work_factor_assessment.is_student_work_from_home);
      this.assessmentReqForm.get('isInvolvesInternationalRemoteWorking')?.setValue(this.placementAssessment?.work_factor_assessment.is_involves_international_remote_working);

      //Laod Travel Factor Assessment
      this.assessmentReqForm.get('hasTravelIssues')?.setValue(this.placementAssessment?.travel_factor_assessment.has_travel_issues);
      this.assessmentReqForm.get('isRequiredToWorkAcrossMultipleSites')?.setValue(this.placementAssessment?.travel_factor_assessment.is_required_to_work_across_multiple_sites);

      //Load Location Factor Assessment
      this.assessmentReqForm.get('hasAnyRisksAtLocation')?.setValue(this.placementAssessment?.location_factor_assessment.has_any_risks_at_location);
      this.assessmentReqForm.get('hasInappropriateAccommodation')?.setValue(this.placementAssessment?.location_factor_assessment.has_inappropriate_accommodation);

      //Load Health Factor Assessment
      this.assessmentReqForm.get('isStudentRequiredToTakeAnyMeasures')?.setValue(this.placementAssessment?.health_factor_assessment.is_student_required_to_take_any_measures);

      //Load Personal Factor Assessment
      this.assessmentReqForm.get('hasStudentPersonalFactorsImplicates')?.setValue(this.placementAssessment?.personal_factor_assessment.has_student_personal_factors_implicates);

      //Load Policies And Insurance Assessment
      this.assessmentReqForm.get('hasPublicLiabilityInsurance')?.setValue(this.placementAssessment?.policies_and_insurance_assessment.has_public_liability_insurance);
      this.assessmentReqForm.get('hasEmployerLiabilityInsurance')?.setValue(this.placementAssessment?.policies_and_insurance_assessment.has_employer_liability_insurance);
      this.assessmentReqForm.get('doesHoldIndemnityInsurance')?.setValue(this.placementAssessment?.policies_and_insurance_assessment.does_hold_indemnity_insurance);
      this.assessmentReqForm.get('hasHealthAndSafetyPolicy')?.setValue(this.placementAssessment?.policies_and_insurance_assessment.has_health_and_safety_policy);

      //Load University Access Support Assessment
      this.assessmentReqForm.get('hasProviderHasAnyObligationsToVisits')?.setValue(this.placementAssessment?.university_access_support_assessment.has_provider_has_any_obligations_to_visits);
      this.assessmentReqForm.get('hasAnyIssuesRelatedToConfidentiality')?.setValue(this.placementAssessment?.university_access_support_assessment.has_any_issues_related_to_confidentiality);

      this.assessmentReqForm.get('placementAuthorizationRequestStatus')?.setValue(this.placementAssessment?.placement_authorization_request_status);
      this.assessmentReqForm.get('authorizationComments')?.setValue(this.placementAssessment?.authorization_comments);

      if(this.placementAssessment?.status != 'DRAFT' && this.placementAssessment?.placement_authorization_request_status != 'ONHOLD'){
        this.onViewMode();
      }
 
    }

    onAutoFillAssessmentFormDetails(){
      this.errorMessage = undefined;
      this.successMessage = undefined;

      this.assessmentService.autoFillAssessmentFormDetails(this.placementRequestId ?? '').subscribe({
        next: (autoFillAssessmentFormResponse) => {
          this.autoFillAssessmentFormResponse = autoFillAssessmentFormResponse;

          //Load Policies And Insurance Assessment
          this.assessmentReqForm.get('hasPublicLiabilityInsurance')?.setValue(this.autoFillAssessmentFormResponse?.has_public_liability_insurance);
          this.assessmentReqForm.get('hasEmployerLiabilityInsurance')?.setValue(this.autoFillAssessmentFormResponse?.has_employer_liability_insurance);
          this.assessmentReqForm.get('doesHoldIndemnityInsurance')?.setValue(this.autoFillAssessmentFormResponse?.has_professional_indemnity_insurance);
          this.assessmentReqForm.get('hasHealthAndSafetyPolicy')?.setValue(this.autoFillAssessmentFormResponse?.has_health_and_safety_policy);

          //Load University Access Support Assessment
          this.assessmentReqForm.get('hasProviderHasAnyObligationsToVisits')?.setValue(this.autoFillAssessmentFormResponse?.has_provider_has_any_obligations_to_visits);
          this.assessmentReqForm.get('hasAnyIssuesRelatedToConfidentiality')?.setValue(this.autoFillAssessmentFormResponse?.has_any_issues_related_to_confidentiality);

        },
        error: (error) => {
          this.errorMessage = error.error;
        }
      });


    }

    onMatchInfo(){
      this.errorMessage = undefined;
      this.successMessage = undefined;
      this.matchInfoErroMessage = undefined;

      if(!this.matchInfoAssessmentView){
        this.assessmentService.matchInformationOfProviderFormAndRequestForm(this.placementRequestId ?? '').subscribe({
          next: (matchInfoAssessment) => {
            this.matchInfoAssessmentResponse = matchInfoAssessment;
            this.matchInfoAssessmentView = true;
          },
          error: (error) => {
            this.matchInfoErroMessage = error.error;
          }
        });
      }else{
        this.matchInfoAssessmentView = false;
      }
    }

    onCheckForFlags(){
      this.errorMessage = undefined;
      this.successMessage = undefined;
      this.flagsErrorMessage = undefined;

      if(!this.flagsView){
        if(this.assessmentReqForm.value.providerName == null || this.assessmentReqForm.value.providerName == ''){
          this.flagsErrorMessage = "Please provide the organization name above to check for the flags";
        }else{
          this.assessmentService.checkForRedFlagsOnProvider(this.assessmentReqForm.value.providerName).subscribe({
            next: (flags) => {
              this.flagsForProvider = flags;
              if(this.flagsForProvider.length >= 1){
                this.flagsForProvider.forEach((flag) => {
                  if(flag.status === 'REJECTED'){ this.anyFlags = true; }
                })
              }
              this.flagsView = true;
            },
            error: (error) => {
              this.flagsErrorMessage = error.error;
            }
          });
        }

      }else{
        this.flagsView = false;
      }
    }

}
