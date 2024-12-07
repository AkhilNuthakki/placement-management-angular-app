export class LocationAndRegionFactor {
    accommodation_arrangements: string | undefined;
    other_accommodation_arrangements: string | undefined;
    has_checked_with_fcdo: string | undefined;
    is_aware_of_any_risks_at_location: string;
    risks_at_location: string;
    provider_ukor_non_uk : string | undefined;

    constructor(accommodation_arrangements: string | undefined,
        other_accommodation_arrangements: string | undefined,
        has_checked_with_fcdo: string | undefined,
        is_aware_of_any_risks_at_location: string,
        risks_at_location: string,
        provider_uk_or_non_uk : string | undefined) {
        this.accommodation_arrangements = accommodation_arrangements;
        this.other_accommodation_arrangements = other_accommodation_arrangements;
        this.has_checked_with_fcdo = has_checked_with_fcdo;
        this.is_aware_of_any_risks_at_location = is_aware_of_any_risks_at_location;
        this.risks_at_location = risks_at_location;
        this.provider_ukor_non_uk = provider_uk_or_non_uk;
    }
}