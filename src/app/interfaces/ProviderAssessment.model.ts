
export class ProviderAssessment {
    organization_name: string;
    impact_university_reputation: string

    constructor(organization_name: string,
        impact_university_reputation: string) {
        this.organization_name = organization_name;
        this.impact_university_reputation = impact_university_reputation;
    }
}