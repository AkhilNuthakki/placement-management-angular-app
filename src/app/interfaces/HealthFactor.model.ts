export class HealthFactor {
    is_aware_of_pre_cautionary_measures: string;
    pre_cautionary_measures: string;
    has_downloaded_safe_zone_app: string | undefined;
    has_applied_global_health_insurance_card: string | undefined;

    constructor(is_aware_of_pre_cautionary_measures: string,
        pre_cautionary_measures: string,
        has_downloaded_safe_zone_app: string | undefined,
        has_applied_global_health_insurance_card: string | undefined) {
        this.is_aware_of_pre_cautionary_measures = is_aware_of_pre_cautionary_measures;
        this.pre_cautionary_measures = pre_cautionary_measures;
        this.has_downloaded_safe_zone_app = has_downloaded_safe_zone_app;
        this.has_applied_global_health_insurance_card = has_applied_global_health_insurance_card;

    }
}