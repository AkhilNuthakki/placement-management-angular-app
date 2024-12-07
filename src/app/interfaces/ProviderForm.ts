import { HealthFactor } from "./HealthFactor.model";
import { PersonalFactor } from "./PersonalFactor.model";
import { PlacementProvider } from "./PlacementProvider.model";
import { PlacementRole } from "./PlacementRole.model";
import { TravelFactor } from "./TravelFactor.model";
import { ProviderWorkFactor } from "./ProviderWorkFactor.model";
import { PoliciesAndInsuranceProviderFactor } from "./PoliciesAndInsuranceProviderFactor.model";
import { PoliciesAndInsuranceNonUKProviderFactor } from "./PoliciesAndInsuranceNonUKProviderFactor.model";
import { HealthAndSafetyProviderFactor } from "./HealthAndSafetyProviderFactor.model";
import { UniversityAccessAndSupportFactor } from "./UniversityAccessAndSupportFactor.model";
import { LocationAndRegionFactor } from "./LocationAndRegionFactor.model";

export class ProviderForm {
    id: string | undefined;
    request_id : string;
    student_name: string;
    placement_provider: PlacementProvider;
    placement_role: PlacementRole;
    work_factor: ProviderWorkFactor;
    travel_factor: TravelFactor;
    health_factor: HealthFactor;
    location_and_region_factor: LocationAndRegionFactor;
    personal_factor: PersonalFactor;
    policies_and_insurance_provider_factor : PoliciesAndInsuranceProviderFactor;
    policies_and_insurance_non_ukprovider_factor : PoliciesAndInsuranceNonUKProviderFactor;
    health_and_safety_provider_factor : HealthAndSafetyProviderFactor;
    university_access_and_support_factor : UniversityAccessAndSupportFactor;
    status: string | undefined;
    status_date: Date | undefined;


    constructor(id: string | undefined,
        request_id : string,
        student_name: string,
        placement_provider: PlacementProvider,
        placement_role: PlacementRole,
        work_factor: ProviderWorkFactor,
        travel_factor: TravelFactor,
        health_factor: HealthFactor,
        location_and_region_factor: LocationAndRegionFactor,
        personal_factor: PersonalFactor,
        policies_and_insurance_provider_factor : PoliciesAndInsuranceProviderFactor,
        policies_and_insurance_non_ukprovider_factor : PoliciesAndInsuranceNonUKProviderFactor,
        health_and_safety_provider_factor : HealthAndSafetyProviderFactor,
        university_access_and_support_factor : UniversityAccessAndSupportFactor) {
        this.id = id;
        this.request_id = request_id;
        this.student_name = student_name;
        this.placement_provider = placement_provider;
        this.placement_role = placement_role;
        this.work_factor = work_factor;
        this.travel_factor = travel_factor;
        this.health_factor = health_factor;
        this.location_and_region_factor = location_and_region_factor;
        this.personal_factor = personal_factor;
        this.policies_and_insurance_provider_factor = policies_and_insurance_provider_factor;
        this.policies_and_insurance_non_ukprovider_factor = policies_and_insurance_non_ukprovider_factor;
        this.health_and_safety_provider_factor = health_and_safety_provider_factor;
        this.university_access_and_support_factor = university_access_and_support_factor;
    }
}