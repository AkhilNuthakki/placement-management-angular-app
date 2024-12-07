export class WorkFactorAssessment {
    organization_working_conditions: string;
    will_provide_training_to_students: string;
    is_student_work_from_home: string;
    is_involves_international_remote_working: string;

    constructor(organization_working_conditions: string,
        will_provide_training_to_students: string,
        is_student_work_from_home: string,
        is_involves_international_remote_working: string,) {
        this.organization_working_conditions = organization_working_conditions;
        this.will_provide_training_to_students = will_provide_training_to_students;
        this.is_student_work_from_home = is_student_work_from_home;
        this.is_involves_international_remote_working = is_involves_international_remote_working;
    }
}