import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlacementAuthorizationRequest } from 'src/app/interfaces/PlacementAuthRequest';
import { HttpClient, HttpParams } from "@angular/common/http";
import { FilterAuthorizationRequest } from 'src/app/interfaces/FilterAuthorizationRequest';

@Injectable({
  providedIn: 'root'
})
export class PlacementAuthReqService {

  placementAuthorizationRequest = new BehaviorSubject<PlacementAuthorizationRequest | undefined>(undefined);

  constructor(private http : HttpClient) { }

  savePlacementAuthorizationRequest(requestBody: PlacementAuthorizationRequest) : Observable<any>{
    return this.http.post('/api/v1.0/placement-management/save-authorization-request', requestBody, {responseType : 'json'});
  }

  submitPlacementAuthorizationRequest(requestBody: PlacementAuthorizationRequest) : Observable<any>{
    return this.http.post('/api/v1.0/placement-management/submit-authorization-request', requestBody, {responseType : 'json'});
  }

  getPlacementAuthorizationRequestsByUserId(userId : string): Observable<PlacementAuthorizationRequest[]>{
    return this.http.get<PlacementAuthorizationRequest[]>(`/api/v1.0/placement-management/requests/user-id/${userId}`, {responseType: 'json'});
  }

  getPlacementAuthorizationRequestsById(requestId : string): Observable<PlacementAuthorizationRequest>{
    return this.http.get<PlacementAuthorizationRequest>(`/api/v1.0/placement-management/requests/request-id/${requestId}`, {responseType: 'json'})
  }

  filterPlacementAuthorizationRequests(requestBody : FilterAuthorizationRequest) : Observable<PlacementAuthorizationRequest[]>{
    return this.http.put<PlacementAuthorizationRequest[]>('/api/v1.0/placement-management/requests/filter', requestBody, {responseType : 'json'});
  }

  getDistinctProviderNames() : Observable<string[]> {
    return this.http.get<string[]>('/api/v1.0/placement-management/requests/distinct-provider-names', {responseType: 'json'});
  }
}
