
export class PlacementVisit {

    id: string | undefined;
    placement_id: string;
    placement_visit_type: string;
    start_time: Date;
    end_time: Date;
    student_name: string;
    student_email: string;
    provider_contact_name: string;
    provider_contact_email: string;


    constructor(id: string | undefined,
        placement_id: string,
        placement_visit_type: string,
        start_time: Date,
        end_time: Date,
        student_name: string,
        student_email: string,
        provider_contact_name: string,
        provider_contact_email: string,
    ) {
        this.id = id;
        this.placement_id = placement_id;
        this.placement_visit_type = placement_visit_type;
        this.start_time = start_time;
        this.end_time = end_time;
        this.student_name = student_name;
        this.student_email = student_email;
        this.provider_contact_name = provider_contact_name;
        this.provider_contact_email = provider_contact_email;


    }
}