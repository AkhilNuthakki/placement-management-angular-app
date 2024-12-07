
export class RegisterProviderRequest {
    user_name: string | undefined;
    user_email_id: string | undefined;
    authorization_request_id: string | undefined;

    constructor(user_name: string | undefined,
        user_email_id: string | undefined,
        authorization_request_id: string | undefined) {
        this.user_email_id = user_email_id;
        this.user_name = user_name;
        this.authorization_request_id = authorization_request_id;
    }
}