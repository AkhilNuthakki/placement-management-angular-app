export class UniversityAccessAndSupportFactor {

    can_undertake_placement_visits: string;
    reason: string;
    confidentiality_to_be_taken_to_account: string;
    more_details_to_account: string;


    constructor(can_undertake_placement_visits: string,
        reason: string,
        confidentiality_to_be_taken_to_account: string,
        more_details_to_account: string) {
        this.can_undertake_placement_visits = can_undertake_placement_visits;
        this.reason = reason;
        this.confidentiality_to_be_taken_to_account = confidentiality_to_be_taken_to_account;
        this.more_details_to_account = more_details_to_account;
    }
}