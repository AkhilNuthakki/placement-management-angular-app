export class PoliciesAndInsuranceAssessment {
    has_public_liability_insurance: string;
    has_employer_liability_insurance: string;
    does_hold_indemnity_insurance: string;
    has_health_and_safety_policy: string;


    constructor(has_public_liability_insurance: string,
        has_employer_liability_insurance: string,
        does_hold_indemnity_insurance: string,
        has_health_and_safety_policy: string) {
        this.has_public_liability_insurance = has_public_liability_insurance;
        this.has_employer_liability_insurance = has_employer_liability_insurance;
        this.does_hold_indemnity_insurance = does_hold_indemnity_insurance;
        this.has_health_and_safety_policy = has_health_and_safety_policy;
    }
}