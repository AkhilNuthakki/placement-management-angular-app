export class PlacementRole {
    title: string;
    start_date: Date;
    end_date: Date;
    working_hours: Number;
    has_probation_period: string;
    probation_period_in_weeks: Number;
    salary: Number | undefined;
    source_of_role: string | undefined;
    other_source_of_role: string | undefined;
    has_informed_provider: string | undefined;
    role_description: string

    constructor(title: string,
        start_date: Date,
        end_date: Date,
        working_hours: Number,
        has_probation_period: string,
        probation_period_in_weeks: Number,
        salary: Number | undefined,
        source_of_role: string | undefined,
        other_source_of_role: string | undefined,
        has_informed_provider: string | undefined,
        role_description: string) {
        this.title = title;
        this.start_date = start_date;
        this.end_date = end_date;
        this.working_hours = working_hours;
        this.has_probation_period = has_probation_period;
        this.probation_period_in_weeks = probation_period_in_weeks;
        this.salary = salary;
        this.source_of_role = source_of_role;
        this.other_source_of_role = other_source_of_role;
        this.has_informed_provider = has_informed_provider;
        this.role_description = role_description;
    }
}