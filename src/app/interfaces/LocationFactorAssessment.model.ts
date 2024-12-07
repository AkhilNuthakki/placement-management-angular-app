export class LocationFactorAssessment {
has_any_risks_at_location: string;
    has_inappropriate_accommodation: string;

    constructor(has_any_risks_at_location: string,
        has_inappropriate_accommodation: string) {
        this.has_any_risks_at_location = has_any_risks_at_location;
        this.has_inappropriate_accommodation = has_inappropriate_accommodation;
    }
}