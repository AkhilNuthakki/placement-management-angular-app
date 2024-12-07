import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestCountGroupByStatus } from 'src/app/interfaces/RequestCountGroupByStatus.model';
import { MatchInfoAssessmentResponse } from 'src/app/interfaces/MatchInfoAssessmentResponse.Model';
import { PlacementAssessment } from 'src/app/interfaces/PlacementAssessment';
import { AutoFillAssessmentFormResponse } from 'src/app/interfaces/AutoFillAssessmentFormResponse';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  placementAssessment = new BehaviorSubject<PlacementAssessment | undefined>(undefined);

  constructor(private http : HttpClient) { }

  savePlacementAssessment(requestBody: PlacementAssessment) : Observable<any>{
    return this.http.post('/api/v1.0/placement-management/save-placement-assessment', requestBody, {responseType : 'json'});
  }

  submitPlacementAssessment(requestBody: PlacementAssessment) : Observable<any>{
    return this.http.post('/api/v1.0/placement-management/submit-placement-assessment', requestBody, {responseType : 'json'});
  }

  getPlacementAssessmentById(assessmentId : string): Observable<PlacementAssessment>{
    return this.http.get<PlacementAssessment>(`/api/v1.0/placement-management/placement-assessment/${assessmentId}`, {responseType: 'json'})
  }

  matchInformationOfProviderFormAndRequestForm(requestId : string) : Observable<MatchInfoAssessmentResponse[]>{
    return this.http.get<MatchInfoAssessmentResponse[]>(`/api/v1.0/placement-management/placement-assessment/match-info/${requestId}`, {responseType: 'json'})
  }

  checkForRedFlagsOnProvider(providerName : string) : Observable<RequestCountGroupByStatus[]>{
    return this.http.get<RequestCountGroupByStatus[]>(`/api/v1.0/placement-management/placement-assessment/flags/${providerName}`, {responseType: 'json'})
  }

  autoFillAssessmentFormDetails(requestId : string) : Observable<AutoFillAssessmentFormResponse>{
    return this.http.get<AutoFillAssessmentFormResponse>(`/api/v1.0/placement-management/placement-assessment/auto-fill/${requestId}`, {responseType: 'json'})
  }

}
