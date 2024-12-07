export class VisitingSlot {

    start_time : Date;
    end_time : Date;
    placement_visit_ids : string[] = [];

    constructor(start_time : Date,
        end_time : Date,
        placement_visit_ids : string[]) {
        this.start_time = start_time;
        this.end_time = end_time;
        this.placement_visit_ids = placement_visit_ids;
    }
}