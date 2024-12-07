export class PoliciesAndInsuranceFactor {
    is_aware_of_travel_request_form: string;
    is_work_country_listed_on_risk_assessment_escalation: string;
    
    constructor(is_aware_of_travel_request_form: string,
        is_work_country_listed_on_risk_assessment_escalation: string) {
        this.is_aware_of_travel_request_form = is_aware_of_travel_request_form;
        this.is_work_country_listed_on_risk_assessment_escalation = is_work_country_listed_on_risk_assessment_escalation;
    }
}