import { HealthFactor } from "./HealthFactor.model";
import { LocationAndRegionFactor } from "./LocationAndRegionFactor.model";
import { PersonalFactor } from "./PersonalFactor.model";
import { PlacementProvider } from "./PlacementProvider.model";
import { PlacementRole } from "./PlacementRole.model";
import { PoliciesAndInsuranceFactor } from "./PoliciesAndInsurnace.model";
import { Student } from "./Student.model";
import { TravelFactor } from "./TravelFactor.model";
import { WorkFactor } from "./WorkFactor.model";

export class PlacementAuthorizationRequest {
    id: string;
    user_id : string;
    student: Student;
    placement_provider: PlacementProvider;
    placement_role: PlacementRole;
    work_factor: WorkFactor;
    travel_factor: TravelFactor;
    location_and_region_factor: LocationAndRegionFactor;
    health_factor: HealthFactor;
    personal_factor: PersonalFactor;
    policies_and_insurance_factor: PoliciesAndInsuranceFactor;
    request_submission_status: string | undefined;
    request_submission_date: Date | undefined;
    provider_form_id : string | undefined;
    provider_form_submission_status : string | undefined;
    provider_form_submission_date : Date | undefined;
    provider_registration_status : string | undefined;
    provider_notified_date : Date | undefined;
    tutor_assessment_id : string | undefined;
    tutor_assessment_submission_status : string | undefined;
    tutor_assessment_submission_date : Date | undefined;
    placement_authorization_request_status: string | undefined;
    authorization_request_status_date: Date | undefined;

    constructor(id: string,
        user_id : string,
        student: Student,
        placement_provider: PlacementProvider,
        placement_role: PlacementRole,
        work_factor: WorkFactor,
        travel_factor: TravelFactor,
        location_and_region_factor: LocationAndRegionFactor,
        health_factor: HealthFactor,
        personal_factor: PersonalFactor,
        policies_and_insurance_factor: PoliciesAndInsuranceFactor) {
        this.id = id;
        this.user_id = user_id;
        this.student = student;
        this.placement_provider = placement_provider;
        this.placement_role = placement_role;
        this.work_factor = work_factor;
        this.travel_factor = travel_factor;
        this.location_and_region_factor = location_and_region_factor;
        this.health_factor = health_factor;
        this.personal_factor = personal_factor;
        this.policies_and_insurance_factor = policies_and_insurance_factor;
    }
}