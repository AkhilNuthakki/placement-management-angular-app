import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Placement } from 'src/app/interfaces/Placement.model';
import { PlacementVisit } from 'src/app/interfaces/PlacementVisit.model';
import { PlacementVisitRequest } from 'src/app/interfaces/PlacementVisitRequest';
import { PlacementVisitSlot } from 'src/app/interfaces/PlacementVisitSlot.model';
import { VisitingSlot } from 'src/app/interfaces/VisitingSlot.model';

@Injectable({
  providedIn: 'root'
})
export class PlacementVisitService {

  constructor(private http : HttpClient) { }

  getAvailablePlacementVisitSlots(schoolName : string): Observable<VisitingSlot[]>{
    return this.http.get<VisitingSlot[]>(`/api/v1.0/placement-management/visits/available-slots/${schoolName}`, {responseType: 'json'});
  }

  schedulePlacementVisit(requestBody : PlacementVisitRequest): Observable<PlacementVisit>{
    return this.http.post<PlacementVisit>('/api/v1.0/placement-management/visits/schedule', requestBody, {responseType : 'json'});
  }

  updateAvailablePlacementVisitSlots(requestBody : PlacementVisitSlot): Observable<PlacementVisitSlot>{
    return this.http.post<PlacementVisitSlot>('/api/v1.0/placement-management/visits/update-slots', requestBody, {responseType : 'json'});
  }

  getPlacementVisitSlots(schoolName : string): Observable<PlacementVisitSlot>{
    return this.http.get<PlacementVisitSlot>(`/api/v1.0/placement-management/visits/all-slots/school/${schoolName}`, {responseType: 'json'});
  }

  getPlacementVisitsByPlacementId(placementId : string): Observable<PlacementVisit[]>{
    return this.http.get<PlacementVisit[]>(`/api/v1.0/placement-management/visits/placement-id/${placementId}`, {responseType: 'json'});
  }

  getPlacementVisitByPlacementVisitId(placementVisitId : string): Observable<PlacementVisit>{
    return this.http.get<PlacementVisit>(`/api/v1.0/placement-management/visits/placement-visit-id/${placementVisitId}`, {responseType: 'json'});
  }

  getSmartVisitPlanSuggestions(schoolName : string): Observable<Placement[][]>{
    return this.http.get<Placement[][]>(`/api/v1.0/placement-management/visits/smart-visit-plan/${schoolName}`, {responseType: 'json'});
  }


}
