export class PoliciesAndInsuranceProviderFactor {
    has_public_liability_insurance: string;
    public_liability_insurance_provider_name: string;
    public_liability_insurance_expiry_date: Date;
    happens_when_there_is_public_claim: string;
    has_employer_liability_insurance: string;
    employer_insurance_provider_name: string;
    employer_insurance_expiry_date: Date;
    happens_when_there_is_employee_claim: string;
    has_professional_indemnity_insurance: string;
    indemnity_insurance_provider_name: string;
    indemnity_insurance_expiry_date: Date;


    constructor(has_public_liability_insurance: string,
        public_liability_insurance_provider_name: string,
        public_liability_insurance_expiry_date: Date,
        happens_when_there_is_public_claim: string,
        has_employer_liability_insurance: string,
        employer_insurance_provider_name: string,
        employer_insurance_expiry_date: Date,
        happens_when_there_is_employee_claim: string,
        has_professional_indemnity_insurance: string,
        indemnity_insurance_provider_name: string,
        indemnity_insurance_expiry_date: Date) {

        this.has_public_liability_insurance = has_public_liability_insurance;
        this.public_liability_insurance_provider_name = public_liability_insurance_provider_name;
        this.public_liability_insurance_expiry_date = public_liability_insurance_expiry_date;
        this.happens_when_there_is_public_claim = happens_when_there_is_public_claim;
        this.has_employer_liability_insurance = has_employer_liability_insurance;
        this.employer_insurance_provider_name = employer_insurance_provider_name;
        this.employer_insurance_expiry_date = employer_insurance_expiry_date;
        this.happens_when_there_is_employee_claim = happens_when_there_is_employee_claim;
        this.has_professional_indemnity_insurance = has_professional_indemnity_insurance;
        this.indemnity_insurance_provider_name = indemnity_insurance_provider_name;
        this.indemnity_insurance_expiry_date = indemnity_insurance_expiry_date;

    }
}