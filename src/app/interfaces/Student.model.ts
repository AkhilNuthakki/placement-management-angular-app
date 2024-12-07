
export class Student {
    first_name: string;
    last_name: string;
    student_number: string;
    email_id: string;
    course: string;
    school: string;
    telephone: string;
    academic_year: string;
    is_international_student: string;
    is_visa_available_during_placement: string


    constructor(first_name: string,
        last_name: string,
        student_number: string,
        email_id: string,
        course: string,
        school: string,
        telephone: string,
        academic_year: string,
        is_international_student: string,
        is_visa_available_during_placement: string) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.student_number = student_number;
        this.email_id = email_id;
        this.course = course;
        this.school = school;
        this.telephone = telephone;
        this.academic_year = academic_year;
        this.is_international_student = is_international_student;
        this.is_visa_available_during_placement = is_visa_available_during_placement
    }
}