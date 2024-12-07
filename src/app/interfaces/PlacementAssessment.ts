import { HealthFactorAssessment } from "./HealthFactorAssessment.model";
import { InfoMatchAssessment } from "./InfoMatchAssessment.model";
import { LocationFactorAssessment } from "./LocationFactorAssessment.model";
import { PersonalFactorAssessment } from "./PersonalFactorAssessment.model";
import { PoliciesAndInsuranceAssessment } from "./PoliciesAndInsuranceAssessment.model";
import { ProviderAssessment } from "./ProviderAssessment.model";
import { RoleAssessment } from "./RoleAssessment.model";
import { TravelFactorAssessment } from "./TravelFactorAssessment.model";
import { UniversityAccessSupportAssessment } from "./UniversityAccessSupportAssessment.model";
import { WorkFactorAssessment } from "./WorkFactorAssessment.model";

export class PlacementAssessment {

    id: string | undefined;
    request_id: string;
    student_name: string;
    provider_assessment: ProviderAssessment;
    info_match_assessment: InfoMatchAssessment;
    role_assessment: RoleAssessment;
    work_factor_assessment: WorkFactorAssessment;
    travel_factor_assessment: TravelFactorAssessment;
    location_factor_assessment: LocationFactorAssessment;
    health_factor_assessment: HealthFactorAssessment;
    personal_factor_assessment: PersonalFactorAssessment;
    policies_and_insurance_assessment: PoliciesAndInsuranceAssessment;
    university_access_support_assessment: UniversityAccessSupportAssessment;
    placement_authorization_request_status: string;
    authorization_comments: string | undefined;
    status: string | undefined;
    status_date: Date | undefined;


    constructor(
        id: string | undefined,
        request_id: string,
        student_name: string,
        provider_assessment: ProviderAssessment,
        info_match_assessment: InfoMatchAssessment,
        role_assessment: RoleAssessment,
        work_factor_assessment: WorkFactorAssessment,
        travel_factor_assessment: TravelFactorAssessment,
        location_factor_assessment: LocationFactorAssessment,
        health_factor_assessment: HealthFactorAssessment,
        personal_factor_assessment: PersonalFactorAssessment,
        policies_and_insurance_assessment: PoliciesAndInsuranceAssessment,
        university_access_support_assessment: UniversityAccessSupportAssessment,
        placement_authorization_request_status: string,
        authorization_comments: string | undefined) {
        this.id = id;
        this.request_id = request_id;
        this.student_name = student_name;
        this.provider_assessment = provider_assessment;
        this.info_match_assessment = info_match_assessment;
        this.role_assessment = role_assessment;
        this.work_factor_assessment = work_factor_assessment;
        this.travel_factor_assessment = travel_factor_assessment;
        this.location_factor_assessment = location_factor_assessment;
        this.health_factor_assessment = health_factor_assessment;
        this.personal_factor_assessment = personal_factor_assessment;
        this.policies_and_insurance_assessment = policies_and_insurance_assessment;
        this.university_access_support_assessment = university_access_support_assessment;
        this.placement_authorization_request_status = placement_authorization_request_status;
        this.authorization_comments = authorization_comments;
    }
}