
export class FilterPlacement {

    provider_name: string | undefined;
    student_course: string | undefined;
    student_name: string | undefined;

    constructor(provider_name: string | undefined,
        student_name : string | undefined,
        student_course: string | undefined) {
        this.provider_name = provider_name;
        this.student_name = student_name;
        this.student_course = student_course;
    }
}