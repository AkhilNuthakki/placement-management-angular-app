export class RoleAssessment {

    has_met_duration_hours_requirements: string;
    has_met_minimum_academic_requirements: string;
    has_provider_complied_with_responsibilities: string;
    has_confidence_on_provider: string;
    is_student_visa_valid: string;
    has_role_date_comply_with_visa: string;

    constructor(has_met_duration_hours_requirements: string,
        has_met_minimum_academic_requirements: string,
        has_provider_complied_with_responsibilities: string,
        has_confidence_on_provider: string,
        is_student_visa_valid: string,
        has_role_date_comply_with_visa: string) {
        this.has_met_duration_hours_requirements = has_met_duration_hours_requirements;
        this.has_met_minimum_academic_requirements = has_met_minimum_academic_requirements;
        this.has_provider_complied_with_responsibilities = has_provider_complied_with_responsibilities;
        this.has_confidence_on_provider = has_confidence_on_provider;
        this.is_student_visa_valid = is_student_visa_valid;
        this.has_role_date_comply_with_visa = has_role_date_comply_with_visa;
    }
}