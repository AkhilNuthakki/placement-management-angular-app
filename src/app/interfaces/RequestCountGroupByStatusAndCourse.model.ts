import { RequestCountGroupByStatus } from "./RequestCountGroupByStatus.model"

export class RequestCountGroupByStatusAndCourse {
    course : string | undefined
    statuses : RequestCountGroupByStatus[] | undefined;
}