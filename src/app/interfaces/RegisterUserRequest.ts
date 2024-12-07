export class RegisterUserRequest {
         
    email_id: string;
    password: string;
    first_name: string;
    last_name: string;
    school: string;
    role: string;
     

    constructor(email:string, password: string, first_name: string, last_name: string, school: string, role: string) {
        this.email_id = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.school = school;
        this.role = role;
    }
}