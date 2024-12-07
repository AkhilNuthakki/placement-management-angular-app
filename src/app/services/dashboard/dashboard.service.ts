import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestCountGroupByStatus } from 'src/app/interfaces/RequestCountGroupByStatus.model';
import { RequestCountGroupByStatusAndCourse } from 'src/app/interfaces/RequestCountGroupByStatusAndCourse.model';
import { RequestCountGroupByStatusAndProviderName } from 'src/app/interfaces/RequestCountGroupByStatusAndProviderName.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }

  getRequestsFromSchoolGroupByStatus(schoolName : string) : Observable<RequestCountGroupByStatus[]>{
    return this.http.get<RequestCountGroupByStatus[]>(`/api/v1.0/placement-management/dashboard/request-count-by-status/${schoolName}`, {responseType: 'json'})
  }

  getRequestsFromSchoolGroupByStatusAndCourse(schoolName : string) : Observable<RequestCountGroupByStatusAndCourse[]>{
    return this.http.get<RequestCountGroupByStatusAndCourse[]>(`/api/v1.0/placement-management/dashboard/request-count-by-status-and-course/${schoolName}`, {responseType: 'json'})
  }

  getRequestsFromSchoolGroupByStatusAndProviderName(schoolName : string) : Observable<RequestCountGroupByStatusAndProviderName[]>{
    return this.http.get<RequestCountGroupByStatusAndProviderName[]>(`/api/v1.0/placement-management/dashboard/request-count-by-status-and-provider-name/${schoolName}`, {responseType: 'json'})
  }
}
