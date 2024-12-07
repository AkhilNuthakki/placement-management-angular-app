import { PlacementProvider } from "./PlacementProvider.model";
import { Student } from "./Student.model";

export class Placement {
    id: string;
    request_id: string;
    role_title: string;
    start_date: Date;
    end_date: Date;
    student: Student;
    placement_provider: PlacementProvider

    constructor(id: string,
        request_id: string,
        role_title: string,
        start_date: Date,
        end_date: Date,
        student: Student,
        placement_provider: PlacementProvider) {
        this.id = id;
        this.request_id = request_id;
        this.role_title = role_title;
        this.start_date = start_date;
        this.end_date = end_date;
        this.student = student;
        this.placement_provider = placement_provider;
   

    }
}