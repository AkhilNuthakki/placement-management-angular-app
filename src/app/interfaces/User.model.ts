export class User {
    user_id : string;
    email_id : string;
    first_name : string;
    last_name : string;
    user_role : string;
    school : string;

    constructor(user_id: string, email : string, first_name : string, last_name : string, role : string, school : string) {
        this.user_id = user_id;
        this.email_id = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.user_role = role;
        this.school = school;
    }
}