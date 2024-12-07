import { RequestCountGroupByStatus } from "./RequestCountGroupByStatus.model"

export class RequestCountGroupByStatusAndProviderName {
    provider_name : string | undefined
    statuses : RequestCountGroupByStatus[] | undefined;
}