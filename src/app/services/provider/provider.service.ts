import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProviderForm } from 'src/app/interfaces/ProviderForm';
import { RegisterProviderRequest } from 'src/app/interfaces/RegisterProviderRequest';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  providerForm = new BehaviorSubject<ProviderForm | undefined>(undefined);

  constructor(private http : HttpClient) { }

  saveProviderForm(requestBody: ProviderForm) : Observable<any>{
    return this.http.post('/api/v1.0/placement-management/save-provider-form', requestBody, {responseType : 'json'});
  }

  submitProviderForm(requestBody: ProviderForm) : Observable<any>{
    return this.http.post('/api/v1.0/placement-management/submit-provider-form', requestBody, {responseType : 'json'});
  }

  getProviderFormById(requestId : string): Observable<ProviderForm>{
    return this.http.get<ProviderForm>(`/api/v1.0/placement-management/provider-form/${requestId}`, {responseType: 'json'})
  }

  registerAndNotifyProvider(requestBody: RegisterProviderRequest) : Observable<any>{
    return this.http.post('/api/v1.0/placement-management/register-and-notify-provider', requestBody, {responseType : 'json'});
  }
}
