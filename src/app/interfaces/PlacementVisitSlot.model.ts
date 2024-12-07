import { VisitingSlot } from "./VisitingSlot.model";

export class PlacementVisitSlot {
    id: string | undefined;
    school: string;
    academic_year: string;
    slots : VisitingSlot[] = [];

    constructor(    id: string | undefined,
        school: string,
        academic_year: string,
        slots : VisitingSlot[]) {
        this.id = id;
        this.school = school;
        this.academic_year = academic_year;
        this.slots = slots
    }
}