
export class AutoFillAssessmentFormResponse {

    has_public_liability_insurance: string;
    has_employer_liability_insurance: string;
    has_professional_indemnity_insurance: string;
    has_health_and_safety_policy: string;
    has_provider_has_any_obligations_to_visits: string;
    has_any_issues_related_to_confidentiality: string;

    constructor(has_public_liability_insurance: string,
        has_employer_liability_insurance: string,
        has_professional_indemnity_insurance: string,
        has_health_and_safety_policy: string,
        has_provider_has_any_obligations_to_visits: string,
        has_any_issues_related_to_confidentiality: string) {
        this.has_public_liability_insurance = has_public_liability_insurance;
        this.has_employer_liability_insurance = has_employer_liability_insurance;
        this.has_professional_indemnity_insurance = has_professional_indemnity_insurance;
        this.has_health_and_safety_policy = has_health_and_safety_policy;
        this.has_provider_has_any_obligations_to_visits = has_provider_has_any_obligations_to_visits;
        this.has_any_issues_related_to_confidentiality = has_any_issues_related_to_confidentiality;
    }
}