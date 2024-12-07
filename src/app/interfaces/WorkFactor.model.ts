
export class WorkFactor {
    is_work_from_home: string;
    remote_work_overview: string;
    why_it_has_remote_work: string;

    constructor(is_work_from_home: string,
        remote_work_overview: string,
        why_it_has_remote_work: string) {
        this.is_work_from_home = is_work_from_home;
        this.remote_work_overview = remote_work_overview;
        this.why_it_has_remote_work = why_it_has_remote_work;
    }
}