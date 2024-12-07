export class PoliciesAndInsuranceNonUKProviderFactor {

    has_public_liability_insurance: string;
    public_liability_insurance_provider_name: string;
    public_liability_insurance_expiry_date: Date;
    happens_when_there_is_public_claim: string;
    has_employer_liability_insurance: string;
    employer_insurance_provider_name: string;
    employer_insurance_expiry_date: Date;
    happens_when_there_is_employee_claim: string;
    has_insurance_for_legal_costs_for_student: string;
    legal_costs_insurance_provider_name: string;
    legal_costs_insurance_expiry_date: Date;



    constructor(has_public_liability_insurance: string,
        public_liability_insurance_provider_name: string,
        public_liability_insurance_expiry_date: Date,
        happens_when_there_is_public_claim: string,
        has_employer_liability_insurance: string,
        employer_insurance_provider_name: string,
        employer_insurance_expiry_date: Date,
        happens_when_there_is_employee_claim: string,
        has_insurance_for_legal_costs_for_student: string,
        legal_costs_insurance_provider_name: string,
        legal_costs_insurance_expiry_date: Date) {

        this.has_public_liability_insurance = has_public_liability_insurance;
        this.public_liability_insurance_provider_name = public_liability_insurance_provider_name;
        this.public_liability_insurance_expiry_date = public_liability_insurance_expiry_date;
        this.happens_when_there_is_public_claim = happens_when_there_is_public_claim;
        this.has_employer_liability_insurance = has_employer_liability_insurance;
        this.employer_insurance_provider_name = employer_insurance_provider_name;
        this.employer_insurance_expiry_date = employer_insurance_expiry_date;
        this.happens_when_there_is_employee_claim = happens_when_there_is_employee_claim;
        this.has_insurance_for_legal_costs_for_student = has_insurance_for_legal_costs_for_student;
        this.legal_costs_insurance_provider_name = legal_costs_insurance_provider_name;
        this.legal_costs_insurance_expiry_date = legal_costs_insurance_expiry_date;
    }
}