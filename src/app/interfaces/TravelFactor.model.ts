export class TravelFactor {
    is_working_in_different_location: string;
    other_address: string;
    is_required_overseas_travel: string;
    has_read_overseas_travel_guidance: string | undefined;
    has_considered_how_to_travel_overseas: string | undefined;
    other_travel_to_placement: string | undefined;
    travel_to_placement: string | undefined;

    constructor(is_working_in_different_location: string,
        other_address: string,
        is_required_overseas_travel: string,
        has_read_overseas_travel_guidance: string | undefined,
        has_considered_how_to_travel_overseas: string | undefined,
        other_travel_to_placement: string | undefined,
        travel_to_placement: string | undefined) {
        this.is_working_in_different_location = is_working_in_different_location;
        this.other_address = other_address;
        this.is_required_overseas_travel = is_required_overseas_travel;
        this.has_read_overseas_travel_guidance = has_read_overseas_travel_guidance;
        this.has_considered_how_to_travel_overseas = has_considered_how_to_travel_overseas;
        this.other_travel_to_placement = other_travel_to_placement;
        this.travel_to_placement = travel_to_placement;
    }
}