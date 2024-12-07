
export class LoginUserRequest {

    email_id: string;
    password: string;

    constructor(email: string, password: string) {
        this.email_id = email;
        this.password = password;
    }
}