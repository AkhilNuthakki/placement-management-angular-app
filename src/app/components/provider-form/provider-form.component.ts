import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HealthAndSafetyProviderFactor } from 'src/app/interfaces/HealthAndSafetyProviderFactor.model';
import { HealthFactor } from 'src/app/interfaces/HealthFactor.model';
import { LocationAndRegionFactor } from 'src/app/interfaces/LocationAndRegionFactor.model';
import { PersonalFactor } from 'src/app/interfaces/PersonalFactor.model';
import { PlacementProvider } from 'src/app/interfaces/PlacementProvider.model';
import { PlacementRole } from 'src/app/interfaces/PlacementRole.model';
import { PoliciesAndInsuranceNonUKProviderFactor } from 'src/app/interfaces/PoliciesAndInsuranceNonUKProviderFactor.model';
import { PoliciesAndInsuranceProviderFactor } from 'src/app/interfaces/PoliciesAndInsuranceProviderFactor.model';
import { ProviderForm } from 'src/app/interfaces/ProviderForm';
import { ProviderWorkFactor } from 'src/app/interfaces/ProviderWorkFactor.model';
import { TravelFactor } from 'src/app/interfaces/TravelFactor.model';
import { UniversityAccessAndSupportFactor } from 'src/app/interfaces/UniversityAccessAndSupportFactor.model';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { OnFormControlValueChange } from 'src/app/validators/OnFormControlValueChange';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.css']
})
export class ProviderFormComponent implements OnInit {
  @Input() providerFormId: string | undefined;

  errorMessage: string | undefined;
  successMessage: string | undefined;
  requestBody: ProviderForm | undefined;
  providerForm: ProviderForm | undefined;
  placementRequestId : string | undefined;
  minRoleStartDate: Date = new Date();
  viewMode : boolean = false;

  providerReqForm : FormGroup = new FormGroup({
    studentName: new FormControl(null, Validators.required),
    providerName: new FormControl(null, Validators.required),
    providerWebAddress: new FormControl(null, Validators.required),
    providerAddress: new FormControl(null, Validators.required),
    providerPostcode: new FormControl(null, Validators.required),
    hasUndertakenAnyActivities : new FormControl(null, Validators.required),
    organizationActivities : new FormControl(null),
    providerContactName: new FormControl(null, Validators.required),
    providerContactEmail: new FormControl(null, [Validators.required, Validators.email]),
    providerContactJobTitle: new FormControl(null, Validators.required),
    providerTelephone: new FormControl(null, Validators.required),
    placementRoleTitle: new FormControl(null, Validators.required),
    placementStartDate: new FormControl(null, Validators.required),
    placementEndDate: new FormControl(null, Validators.required),
    workingHours: new FormControl(null, Validators.required),
    hasProbationPeriod: new FormControl(null, Validators.required),
    probationPeriodInWeeks: new FormControl(null),
    roleDescription: new FormControl(null, Validators.required),
    hasAnyHazardsOrRisks : new FormControl(null, Validators.required),
    hazardsOrRisks : new FormControl(null),
    isAnyTrainingRequired: new FormControl(null, Validators.required),
    howTrainingIsProvided: new FormControl(null),
    isWorkFromHome: new FormControl(null, Validators.required),
    howFrequentlyWorkFromHome: new FormControl(null),
    howStudentIsMonitored: new FormControl(null),
    isWorkingInDifferentLocation: new FormControl(null, Validators.required),
    otherAddress: new FormControl(null),
    isRequiredOverseasTravel: new FormControl(null, Validators.required),
    isAwareOfAnyRisksAtLocation: new FormControl(null, Validators.required),
    risksAtLocation: new FormControl(null),
    isAwareOfPreCautionaryMeasures: new FormControl(null, Validators.required),
    preCautionaryMeasures: new FormControl(null),
    hasConsideredAnyAdjustments: new FormControl(null, Validators.required),
    providerUKorNonUK : new FormControl(null, Validators.required),
    hasPublicLiabilityInsurance: new FormControl(null),
    publicLiabilityInsuranceProviderName: new FormControl(null),
    publicLiabilityInsuranceExpiryDate: new FormControl(null),
    happensWhenThereIsPublicClaim: new FormControl(null),
    hasEmployerLiabilityInsurance: new FormControl(null),
    employerInsuranceProviderName: new FormControl(null),
    employerInsuranceExpiryDate: new FormControl(null),
    happensWhenThereIsEmployeeClaim: new FormControl(null),
    hasProfessionalIndemnityInsurance: new FormControl(null),
    indemnityInsuranceProviderName: new FormControl(null),
    indemnityInsuranceExpiryDate: new FormControl(null),
    hasPublicLiabilityInsuranceNonUK: new FormControl(null),
    publicLiabilityInsuranceProviderNameNonUK: new FormControl(null),
    publicLiabilityInsuranceExpiryDateNonUK: new FormControl(null),
    happensWhenThereIsPublicClaimNonUK: new FormControl(null),
    hasEmployerLiabilityInsuranceNonUK: new FormControl(null),
    employerInsuranceProviderNameNonUK: new FormControl(null),
    employerInsuranceExpiryDateNonUK: new FormControl(null),
    happensWhenThereIsEmployeeClaimNonUK: new FormControl(null),
    hasInsuranceForLegalCostsForStudent: new FormControl(null),
    legalCostsInsuranceProviderName: new FormControl(null),
    legalCostsInsuranceExpiryDate: new FormControl(null),
    hasProcedureForRecordingIncidents: new FormControl(null),
    hasHealthAndSafetyPolicy: new FormControl(null, Validators.required),
    doesProvidesHealthAndSafetyTraining: new FormControl(null, Validators.required),
    canUndertakePlacementVisits: new FormControl(null, Validators.required),
    reason: new FormControl(null),
    confidentialityToBeTakenToAccount: new FormControl(null, Validators.required),
    moreDetailsToAccount: new FormControl(null)
  });

  constructor(private providerService: ProviderService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.errorMessage = undefined;
    this.successMessage = undefined;
    this.minRoleStartDate.setDate(this.minRoleStartDate.getDate() + 10);

    this.route.queryParams.subscribe(params => {
      this.placementRequestId = params['requestId'] ?? undefined;
    });

    if (this.providerFormId == null || this.providerFormId == undefined) {
      this.route.paramMap.subscribe(params => {
        this.providerFormId = params.get('id') ?? undefined;
      });
    }
    if (this.providerFormId != undefined || this.providerFormId != null) {
      this.providerService.getProviderFormById(this.providerFormId).subscribe({
        next: (providerForm) => {
          this.providerForm = providerForm;
          this.loadForm();
        },
        error: (error) => {
          this.errorMessage = error.error;
        }
      });
    }

    //Adding Dynamic Custom Validations
    OnFormControlValueChange(this.providerReqForm, 'hasUndertakenAnyActivities', 'Yes', 'organizationActivities');
    OnFormControlValueChange(this.providerReqForm, 'hasProbationPeriod', 'Yes', 'probationPeriodInWeeks');
    OnFormControlValueChange(this.providerReqForm, 'hasAnyHazardsOrRisks', 'Yes', 'hazardsOrRisks');
    OnFormControlValueChange(this.providerReqForm, 'isAnyTrainingRequired', 'Yes', 'howTrainingIsProvided');
    OnFormControlValueChange(this.providerReqForm, 'isWorkFromHome', 'Yes', 'howFrequentlyWorkFromHome');
    OnFormControlValueChange(this.providerReqForm, 'isWorkFromHome', 'Yes', 'howStudentIsMonitored');
    OnFormControlValueChange(this.providerReqForm, 'isWorkingInDifferentLocation', 'Yes', 'otherAddress');
    OnFormControlValueChange(this.providerReqForm, 'isAwareOfAnyRisksAtLocation', 'Yes', 'risksAtLocation');
    OnFormControlValueChange(this.providerReqForm, 'isAwareOfPreCautionaryMeasures', 'Yes', 'preCautionaryMeasures');
    OnFormControlValueChange(this.providerReqForm, 'providerUKorNonUK', 'UK', 'hasPublicLiabilityInsurance');
    OnFormControlValueChange(this.providerReqForm, 'providerUKorNonUK', 'UK', 'hasEmployerLiabilityInsurance');
    OnFormControlValueChange(this.providerReqForm, 'providerUKorNonUK', 'UK', 'hasProfessionalIndemnityInsurance');
    OnFormControlValueChange(this.providerReqForm, 'hasPublicLiabilityInsurance', 'Yes', 'publicLiabilityInsuranceProviderName');
    OnFormControlValueChange(this.providerReqForm, 'hasPublicLiabilityInsurance', 'Yes', 'publicLiabilityInsuranceExpiryDate');
    OnFormControlValueChange(this.providerReqForm, 'hasPublicLiabilityInsurance', 'No', 'happensWhenThereIsPublicClaim');
    OnFormControlValueChange(this.providerReqForm, 'hasEmployerLiabilityInsurance', 'Yes', 'employerInsuranceProviderName');
    OnFormControlValueChange(this.providerReqForm, 'hasEmployerLiabilityInsurance', 'Yes', 'employerInsuranceExpiryDate');
    OnFormControlValueChange(this.providerReqForm, 'hasEmployerLiabilityInsurance', 'No', 'happensWhenThereIsEmployeeClaim');
    OnFormControlValueChange(this.providerReqForm, 'hasProfessionalIndemnityInsurance', 'Yes', 'indemnityInsuranceProviderName');
    OnFormControlValueChange(this.providerReqForm, 'hasProfessionalIndemnityInsurance', 'Yes', 'indemnityInsuranceExpiryDate');
    OnFormControlValueChange(this.providerReqForm, 'providerUKorNonUK', 'Non-UK', 'hasPublicLiabilityInsuranceNonUK');
    OnFormControlValueChange(this.providerReqForm, 'providerUKorNonUK', 'Non-UK', 'hasEmployerLiabilityInsuranceNonUK');
    OnFormControlValueChange(this.providerReqForm, 'providerUKorNonUK', 'Non-UK', 'hasInsuranceForLegalCostsForStudent');
    OnFormControlValueChange(this.providerReqForm, 'hasPublicLiabilityInsuranceNonUK', 'Yes', 'publicLiabilityInsuranceProviderNameNonUK');
    OnFormControlValueChange(this.providerReqForm, 'hasPublicLiabilityInsuranceNonUK', 'Yes', 'publicLiabilityInsuranceExpiryDateNonUK');
    OnFormControlValueChange(this.providerReqForm, 'hasPublicLiabilityInsuranceNonUK', 'No', 'happensWhenThereIsPublicClaimNonUK');
    OnFormControlValueChange(this.providerReqForm, 'hasEmployerLiabilityInsuranceNonUK', 'Yes', 'employerInsuranceProviderNameNonUK');
    OnFormControlValueChange(this.providerReqForm, 'hasEmployerLiabilityInsuranceNonUK', 'Yes', 'employerInsuranceExpiryDateNonUK');
    OnFormControlValueChange(this.providerReqForm, 'hasEmployerLiabilityInsuranceNonUK', 'No', 'happensWhenThereIsEmployeeClaimNonUK');
    OnFormControlValueChange(this.providerReqForm, 'hasInsuranceForLegalCostsForStudent', 'Yes', 'legalCostsInsuranceProviderName');
    OnFormControlValueChange(this.providerReqForm, 'hasInsuranceForLegalCostsForStudent', 'Yes', 'legalCostsInsuranceExpiryDate');
    OnFormControlValueChange(this.providerReqForm, 'canUndertakePlacementVisits', 'No', 'reason');
    OnFormControlValueChange(this.providerReqForm, 'confidentialityToBeTakenToAccount', 'Yes', 'moreDetailsToAccount');
  }


  onSubmit() {
    this.errorMessage = undefined;
    this.successMessage = undefined;
    const requestBody = this.createRequestBody();

    this.providerService.submitProviderForm(requestBody).subscribe({
      next: (providerForm) => {
        this.providerForm = providerForm;
        this.successMessage = 'The request is submmitted successfully.';
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

    this.providerService.saveProviderForm(requestBody).subscribe({
      next: (providerForm) => {
        this.successMessage = 'These details are saved successfully. This request will be not processed until it is submmited.';
        this.providerForm = providerForm;
        window.scrollTo(0, 0);
      },
      error: (error) => {
        this.errorMessage = error.error;
        window.scrollTo(0, 0);
      }
    });
  }

  onViewMode(){
    this.viewMode = true;
    this.providerReqForm.disable();
  }

  createRequestBody() : ProviderForm {
    const placement_provider = new PlacementProvider(this.providerReqForm.value.providerName,
      this.providerReqForm.value.providerAddress,
      this.providerReqForm.value.providerWebAddress,
      this.providerReqForm.value.providerPostcode,
      this.providerReqForm.value.providerContactName,
      this.providerReqForm.value.providerContactEmail,
      this.providerReqForm.value.providerContactJobTitle,
      this.providerReqForm.value.providerTelephone,
      this.providerReqForm.value.hasUndertakenAnyActivities,
      this.providerReqForm.value.organizationActivities,
    );

    const placement_role = new PlacementRole(this.providerReqForm.value.placementRoleTitle,
      this.providerReqForm.value.placementStartDate,
      this.providerReqForm.value.placementEndDate,
      this.providerReqForm.value.workingHours,
      this.providerReqForm.value.hasProbationPeriod,
      this.providerReqForm.value.probationPeriodInWeeks,
      undefined,
      undefined,
      undefined,
      undefined,
      this.providerReqForm.value.roleDescription
    )

    const work_factor = new ProviderWorkFactor(this.providerReqForm.value.hasAnyHazardsOrRisks,
      this.providerReqForm.value.hazardsOrRisks,
      this.providerReqForm.value.isAnyTrainingRequired,
      this.providerReqForm.value.howTrainingIsProvided,
      this.providerReqForm.value.isWorkFromHome,
      this.providerReqForm.value.howFrequentlyWorkFromHome,
      this.providerReqForm.value.howStudentIsMonitored
    );
    
    const travel_factor = new TravelFactor(this.providerReqForm.value.isWorkingInDifferentLocation,
      this.providerReqForm.value.otherAddress,
      this.providerReqForm.value.isRequiredOverseasTravel,
      undefined,
      undefined,
      undefined,
      undefined
    )

    const location_and_region_factor = new LocationAndRegionFactor(undefined,
      undefined,
      undefined,
      this.providerReqForm.value.isAwareOfAnyRisksAtLocation,
      this.providerReqForm.value.risksAtLocation,
      this.providerReqForm.value.providerUKorNonUK
    );

    const health_factor = new HealthFactor(this.providerReqForm.value.isAwareOfPreCautionaryMeasures,
      this.providerReqForm.value.preCautionaryMeasures,
      undefined,
      undefined
    );

    const personal_factor = new PersonalFactor(this.providerReqForm.value.hasConsideredAnyAdjustments);

    const policies_and_insurance_provider_factor = new PoliciesAndInsuranceProviderFactor(this.providerReqForm.value.hasPublicLiabilityInsurance,
      this.providerReqForm.value.publicLiabilityInsuranceProviderName,
      this.providerReqForm.value.publicLiabilityInsuranceExpiryDate,
      this.providerReqForm.value.happensWhenThereIsPublicClaim,
      this.providerReqForm.value.hasEmployerLiabilityInsurance,
      this.providerReqForm.value.employerInsuranceProviderName,
      this.providerReqForm.value.employerInsuranceExpiryDate,
      this.providerReqForm.value.happensWhenThereIsEmployeeClaim,
      this.providerReqForm.value.hasProfessionalIndemnityInsurance,
      this.providerReqForm.value.indemnityInsuranceProviderName,
      this.providerReqForm.value.indemnityInsuranceExpiryDate,
    );

    const policies_and_insurance_non_ukprovider_factor = new PoliciesAndInsuranceNonUKProviderFactor(this.providerReqForm.value.hasPublicLiabilityInsuranceNonUK,
      this.providerReqForm.value.publicLiabilityInsuranceProviderNameNonUK,
      this.providerReqForm.value.publicLiabilityInsuranceExpiryDateNonUK,
      this.providerReqForm.value.happensWhenThereIsPublicClaimNonUK,
      this.providerReqForm.value.hasEmployerLiabilityInsuranceNonUK,
      this.providerReqForm.value.employerInsuranceProviderNameNonUK,
      this.providerReqForm.value.employerInsuranceExpiryDateNonUK,
      this.providerReqForm.value.happensWhenThereIsEmployeeClaimNonUK,
      this.providerReqForm.value.hasInsuranceForLegalCostsForStudent,
      this.providerReqForm.value.legalCostsInsuranceProviderName,
      this.providerReqForm.value.legalCostsInsuranceExpiryDate,
    );

    const health_and_safety_provider_factor = new HealthAndSafetyProviderFactor(this.providerReqForm.value.hasProcedureForRecordingIncidents,
      this.providerReqForm.value.hasHealthAndSafetyPolicy,
      this.providerReqForm.value.doesProvidesHealthAndSafetyTraining
    );

    const university_access_and_support_factor = new UniversityAccessAndSupportFactor(this.providerReqForm.value.canUndertakePlacementVisits,
      this.providerReqForm.value.reason,
      this.providerReqForm.value.confidentialityToBeTakenToAccount,
      this.providerReqForm.value.moreDetailsToAccount
    );

    const requestBody = new ProviderForm(this.providerForm?.id,
      this.placementRequestId ?? '',
      this.providerReqForm.value.studentName,
      placement_provider,
      placement_role,
      work_factor,
      travel_factor,
      health_factor,
      location_and_region_factor,
      personal_factor,
      policies_and_insurance_provider_factor,
      policies_and_insurance_non_ukprovider_factor,
      health_and_safety_provider_factor,
    university_access_and_support_factor);

    return requestBody;
  }

  loadForm() {
    console.log(this.providerForm);
    //Load Student Details
    this.providerReqForm.get('studentName')?.setValue(this.providerForm?.student_name);

    //Load Provider Details
    this.providerReqForm.get('providerName')?.setValue(this.providerForm?.placement_provider.name);
    this.providerReqForm.get('providerWebAddress')?.setValue(this.providerForm?.placement_provider.web_address);
    this.providerReqForm.get('providerAddress')?.setValue(this.providerForm?.placement_provider.address);
    this.providerReqForm.get('providerPostcode')?.setValue(this.providerForm?.placement_provider.postcode);
    this.providerReqForm.get('providerContactName')?.setValue(this.providerForm?.placement_provider.contact_name);
    this.providerReqForm.get('providerContactEmail')?.setValue(this.providerForm?.placement_provider.contact_email);
    this.providerReqForm.get('providerContactJobTitle')?.setValue(this.providerForm?.placement_provider.contact_job_title);
    this.providerReqForm.get('providerTelephone')?.setValue(this.providerForm?.placement_provider.telephone);
    this.providerReqForm.get('hasUndertakenAnyActivities')?.setValue(this.providerForm?.placement_provider.has_undertaken_any_activities);
    this.providerReqForm.get('organizationActivities')?.setValue(this.providerForm?.placement_provider.organization_activities);

    //Load Placement role Details
    this.providerReqForm.get('placementRoleTitle')?.setValue(this.providerForm?.placement_role.title);
    this.providerReqForm.get('placementStartDate')?.setValue(formatDate(this.providerForm?.placement_role.start_date ?? '','yyyy-MM-dd','en-US'));
    this.providerReqForm.get('placementEndDate')?.setValue(formatDate(this.providerForm?.placement_role.end_date ?? '','yyyy-MM-dd','en-US'));
    this.providerReqForm.get('workingHours')?.setValue(this.providerForm?.placement_role.working_hours);
    this.providerReqForm.get('hasProbationPeriod')?.setValue(this.providerForm?.placement_role.has_probation_period);
    this.providerReqForm.get('probationPeriodInWeeks')?.setValue(this.providerForm?.placement_role.probation_period_in_weeks);
    this.providerReqForm.get('roleDescription')?.setValue(this.providerForm?.placement_role.role_description);

    //Load Work Factor Details
    this.providerReqForm.get('hasAnyHazardsOrRisks')?.setValue(this.providerForm?.work_factor.has_any_hazards_or_risks);
    this.providerReqForm.get('hazardsOrRisks')?.setValue(this.providerForm?.work_factor.hazards_or_risks);
    this.providerReqForm.get('isAnyTrainingRequired')?.setValue(this.providerForm?.work_factor.is_any_training_required);
    this.providerReqForm.get('howTrainingIsProvided')?.setValue(this.providerForm?.work_factor.how_training_is_provided);
    this.providerReqForm.get('isWorkFromHome')?.setValue(this.providerForm?.work_factor.is_work_from_home);
    this.providerReqForm.get('howFrequentlyWorkFromHome')?.setValue(this.providerForm?.work_factor.how_frequently_work_from_home);
    this.providerReqForm.get('howStudentIsMonitored')?.setValue(this.providerForm?.work_factor.how_student_is_monitored);

    //Load Travel Factor Details
    this.providerReqForm.get('isWorkingInDifferentLocation')?.setValue(this.providerForm?.travel_factor.is_working_in_different_location);
    this.providerReqForm.get('otherAddress')?.setValue(this.providerForm?.travel_factor.other_address);
    this.providerReqForm.get('isRequiredOverseasTravel')?.setValue(this.providerForm?.travel_factor.is_required_overseas_travel);

    //Load Location and region Factors Details
    this.providerReqForm.get('isAwareOfAnyRisksAtLocation')?.setValue(this.providerForm?.location_and_region_factor?.is_aware_of_any_risks_at_location);
    this.providerReqForm.get('risksAtLocation')?.setValue(this.providerForm?.location_and_region_factor?.risks_at_location);
    this.providerReqForm.get('providerUKorNonUK')?.setValue(this.providerForm?.location_and_region_factor?.provider_ukor_non_uk);

    //Load Health Factors Details
    this.providerReqForm.get('isAwareOfPreCautionaryMeasures')?.setValue(this.providerForm?.health_factor.is_aware_of_pre_cautionary_measures);
    this.providerReqForm.get('preCautionaryMeasures')?.setValue(this.providerForm?.health_factor.pre_cautionary_measures);

    //Load Personal Factor Details
    this.providerReqForm.get('hasConsideredAnyAdjustments')?.setValue(this.providerForm?.personal_factor.has_considered_any_adjustments);

    //Load Policies and Insurance Factor Details
    this.providerReqForm.get('isAwareOfTravelRequestForm')?.setValue(this.providerForm?.health_factor.has_applied_global_health_insurance_card);
    this.providerReqForm.get('isWorkCountryListedOnRiskAssessmentEscalation')?.setValue(this.providerForm?.health_factor.has_applied_global_health_insurance_card);

    //Load Policies and Insurance Provider Factor 
    this.providerReqForm.get('hasPublicLiabilityInsurance')?.setValue(this.providerForm?.policies_and_insurance_provider_factor.has_public_liability_insurance);
    if(this.providerForm?.policies_and_insurance_provider_factor.has_public_liability_insurance == 'Yes'){
      this.providerReqForm.get('publicLiabilityInsuranceProviderName')?.setValue(this.providerForm?.policies_and_insurance_provider_factor.public_liability_insurance_provider_name);
      this.providerReqForm.get('publicLiabilityInsuranceExpiryDate')?.setValue(formatDate(this.providerForm?.policies_and_insurance_provider_factor.public_liability_insurance_expiry_date ?? '', 'yyyy-MM-dd', 'en-US'));
    }
    this.providerReqForm.get('happensWhenThereIsPublicClaim')?.setValue(this.providerForm?.policies_and_insurance_provider_factor.happens_when_there_is_public_claim);

    this.providerReqForm.get('hasEmployerLiabilityInsurance')?.setValue(this.providerForm?.policies_and_insurance_provider_factor.has_employer_liability_insurance);
    if(this.providerForm?.policies_and_insurance_provider_factor.has_employer_liability_insurance == 'Yes'){
      this.providerReqForm.get('employerInsuranceProviderName')?.setValue(this.providerForm?.policies_and_insurance_provider_factor.employer_insurance_provider_name);
    this.providerReqForm.get('employerInsuranceExpiryDate')?.setValue(formatDate(this.providerForm?.policies_and_insurance_provider_factor.employer_insurance_expiry_date ?? '','yyyy-MM-dd','en-US'));
    }
    this.providerReqForm.get('happensWhenThereIsEmployeeClaim')?.setValue(this.providerForm?.policies_and_insurance_provider_factor.happens_when_there_is_employee_claim);

    this.providerReqForm.get('hasProfessionalIndemnityInsurance')?.setValue(this.providerForm?.policies_and_insurance_provider_factor.has_professional_indemnity_insurance);
    if(this.providerForm?.policies_and_insurance_provider_factor.has_professional_indemnity_insurance == 'Yes'){
      this.providerReqForm.get('indemnityInsuranceProviderName')?.setValue(this.providerForm?.policies_and_insurance_provider_factor.indemnity_insurance_provider_name);
      this.providerReqForm.get('indemnityInsuranceExpiryDate')?.setValue(formatDate(this.providerForm?.policies_and_insurance_provider_factor.indemnity_insurance_expiry_date ?? '','yyyy-MM-dd','en-US'));
    }
   

    //Load Policies and Insurance Non UK Provider Factor 
    this.providerReqForm.get('hasPublicLiabilityInsuranceNonUK')?.setValue(this.providerForm?.policies_and_insurance_non_ukprovider_factor.has_public_liability_insurance);
    if(this.providerForm?.policies_and_insurance_non_ukprovider_factor.has_public_liability_insurance == 'Yes'){
      this.providerReqForm.get('publicLiabilityInsuranceProviderNameNonUK')?.setValue(this.providerForm?.policies_and_insurance_non_ukprovider_factor.public_liability_insurance_provider_name);
      this.providerReqForm.get('publicLiabilityInsuranceExpiryDateNonUK')?.setValue(formatDate(this.providerForm?.policies_and_insurance_non_ukprovider_factor.public_liability_insurance_expiry_date ?? '','yyyy-MM-dd','en-US'));
    }
    this.providerReqForm.get('happensWhenThereIsPublicClaimNonUK')?.setValue(this.providerForm?.policies_and_insurance_non_ukprovider_factor.happens_when_there_is_public_claim);

    this.providerReqForm.get('hasEmployerLiabilityInsuranceNonUK')?.setValue(this.providerForm?.policies_and_insurance_non_ukprovider_factor.has_employer_liability_insurance);
    if(this.providerForm?.policies_and_insurance_non_ukprovider_factor.has_employer_liability_insurance == 'Yes'){
      this.providerReqForm.get('employerInsuranceProviderNameNonUK')?.setValue(this.providerForm?.policies_and_insurance_non_ukprovider_factor.employer_insurance_provider_name);
      this.providerReqForm.get('employerInsuranceExpiryDateNonUK')?.setValue(formatDate(this.providerForm?.policies_and_insurance_non_ukprovider_factor.employer_insurance_expiry_date ?? '','yyyy-MM-dd','en-US'));
    }
    this.providerReqForm.get('happensWhenThereIsEmployeeClaimNonUK')?.setValue(this.providerForm?.policies_and_insurance_non_ukprovider_factor.happens_when_there_is_employee_claim);

    this.providerReqForm.get('hasInsuranceForLegalCostsForStudent')?.setValue(this.providerForm?.policies_and_insurance_non_ukprovider_factor.has_insurance_for_legal_costs_for_student);
    if(this.providerForm?.policies_and_insurance_non_ukprovider_factor.has_insurance_for_legal_costs_for_student == 'Yes'){
      this.providerReqForm.get('legalCostsInsuranceProviderName')?.setValue(this.providerForm?.policies_and_insurance_non_ukprovider_factor.legal_costs_insurance_provider_name);
    this.providerReqForm.get('legalCostsInsuranceExpiryDate')?.setValue(formatDate(this.providerForm?.policies_and_insurance_non_ukprovider_factor.legal_costs_insurance_expiry_date ?? '','yyyy-MM-dd','en-US'));
    }

    //Load Health and Safety Provider Factor
    this.providerReqForm.get('hasProcedureForRecordingIncidents')?.setValue(this.providerForm?.health_and_safety_provider_factor.has_procedure_for_recording_incidents);
    this.providerReqForm.get('hasHealthAndSafetyPolicy')?.setValue(this.providerForm?.health_and_safety_provider_factor.has_health_and_safety_policy);
    this.providerReqForm.get('doesProvidesHealthAndSafetyTraining')?.setValue(this.providerForm?.health_and_safety_provider_factor.does_provides_health_and_safety_training);

    //Load University Access Support Factor
    this.providerReqForm.get('canUndertakePlacementVisits')?.setValue(this.providerForm?.university_access_and_support_factor.can_undertake_placement_visits);
    this.providerReqForm.get('reason')?.setValue(this.providerForm?.university_access_and_support_factor.reason);
    this.providerReqForm.get('confidentialityToBeTakenToAccount')?.setValue(this.providerForm?.university_access_and_support_factor.confidentiality_to_be_taken_to_account);
    this.providerReqForm.get('moreDetailsToAccount')?.setValue(this.providerForm?.university_access_and_support_factor.more_details_to_account);

    if(this.providerForm?.status != 'DRAFT'){
      this.onViewMode();
      this.providerReqForm.disable();
    }
  }
}
