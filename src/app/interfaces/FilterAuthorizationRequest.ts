
export class FilterAuthorizationRequest {

    provider_name: string | undefined;
    placement_auth_request_status: string | undefined;
    student_course: string | undefined;

    constructor(provider_name: string | undefined,
        placement_auth_request_status: string | undefined,
        student_course: string | undefined) {
        this.provider_name = provider_name;
        this.placement_auth_request_status = placement_auth_request_status;
        this.student_course = student_course;

    }
}