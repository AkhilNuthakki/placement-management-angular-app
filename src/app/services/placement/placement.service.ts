import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterPlacement } from 'src/app/interfaces/FilterPlacement';
import { Placement } from 'src/app/interfaces/Placement.model';

@Injectable({
  providedIn: 'root'
})
export class PlacementService {

  constructor(private http : HttpClient) { }

  getPlacementsByUserId(userId : string): Observable<Placement[]>{
    return this.http.get<Placement[]>(`/api/v1.0/placement-management/placements/user-id/${userId}`, {responseType: 'json'});
  }

  getPlacementById(placementId : string): Observable<Placement>{
    return this.http.get<Placement>(`/api/v1.0/placement-management/placements/${placementId}`, {responseType: 'json'})
  }

  updatePlacement(requestBody: Placement) : Observable<Placement>{
    return this.http.patch<Placement>('/api/v1.0/placement-management/placements/update-placement', requestBody, {responseType : 'json'});
  }

  filterPlacements(requestBody : FilterPlacement) : Observable<Placement[]>{
    return this.http.put<Placement[]>('/api/v1.0/placement-management/placements/filter', requestBody, {responseType : 'json'});
  }
}
