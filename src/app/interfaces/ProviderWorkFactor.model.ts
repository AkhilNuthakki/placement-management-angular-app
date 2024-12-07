export class ProviderWorkFactor {

    has_any_hazards_or_risks: string;
    hazards_or_risks: string;
    is_any_training_required: string;
    how_training_is_provided: string;
    is_work_from_home: string;
    how_frequently_work_from_home: string;
    how_student_is_monitored: string;


    constructor(has_any_hazards_or_risks: string,
        hazards_or_risks: string,
        is_any_training_required: string,
        how_training_is_provided: string,
        is_work_from_home: string,
        how_frequently_work_from_home: string,
        how_student_is_monitored: string) {

        this.has_any_hazards_or_risks = has_any_hazards_or_risks;
        this.hazards_or_risks = hazards_or_risks;
        this.is_any_training_required = is_any_training_required;
        this.how_training_is_provided = how_training_is_provided;
        this.is_work_from_home = is_work_from_home;
        this.how_frequently_work_from_home = how_frequently_work_from_home;
        this.how_student_is_monitored = how_student_is_monitored;

    }
}