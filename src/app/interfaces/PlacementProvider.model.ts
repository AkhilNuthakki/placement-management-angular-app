export class PlacementProvider {
    name: string;
    address: string;
    web_address: string;
    postcode: string;
    latitude: number | undefined;
    longitude: number | undefined;
    contact_name: string;
    contact_email: string;
    contact_job_title: string;
    telephone: string
    has_undertaken_any_activities : string;
    organization_activities : string;


    constructor(name: string,
        address: string,
        web_address: string,
        postcode: string,
        contact_name: string,
        contact_email: string,
        contact_job_title : string,
        telephone: string,
        has_undertaken_any_activities: string,
        organization_activities: string) {
        this.name = name;
        this.address = address;
        this.web_address = web_address;
        this.postcode = postcode;
        this.contact_name = contact_name;
        this.contact_email = contact_email;
        this.contact_job_title = contact_job_title;
        this.telephone = telephone;
        this.has_undertaken_any_activities = has_undertaken_any_activities;
        this.organization_activities = organization_activities;
    }


}