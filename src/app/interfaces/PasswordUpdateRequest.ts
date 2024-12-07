
export class PasswordUpdateRequest {
    email_id : string;
    password : string;

    constructor(email_id : string, password: string) {
        this.email_id = email_id;
        this.password = password;
    }
}