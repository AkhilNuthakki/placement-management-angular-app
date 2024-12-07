export class UniversityAccessSupportAssessment {
    has_provider_has_any_obligations_to_visits: string;
    has_any_issues_related_to_confidentiality: string;

    constructor(has_provider_has_any_obligations_to_visits: string,
        has_any_issues_related_to_confidentiality: string) {
        this.has_provider_has_any_obligations_to_visits = has_provider_has_any_obligations_to_visits;
        this.has_any_issues_related_to_confidentiality = has_any_issues_related_to_confidentiality
    }
}