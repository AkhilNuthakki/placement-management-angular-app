export class TravelFactorAssessment {
    has_travel_issues: string;
    is_required_to_work_across_multiple_sites: string;

    constructor(has_travel_issues: string,
        is_required_to_work_across_multiple_sites: string) {
        this.has_travel_issues = has_travel_issues;
        this.is_required_to_work_across_multiple_sites = is_required_to_work_across_multiple_sites;
    }
}