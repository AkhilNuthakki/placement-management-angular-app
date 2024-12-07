import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from 'src/app/interfaces/User.model';
import { LoginUserRequest } from 'src/app/interfaces/LoginUserRequest';
import { RegisterUserRequest } from 'src/app/interfaces/RegisterUserRequest';
import { PasswordUpdateRequest } from "src/app/interfaces/PasswordUpdateRequest";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient) { }

  registerUser(requestbody: RegisterUserRequest): Observable<any> {
    return this.http.post('/api/v1.0/placement-management/users/register', requestbody, {responseType: 'text'});
  }

  loginUser(requestbody: LoginUserRequest): Observable<any> {
    return this.http.post('/api/v1.0/placement-management/users/login', requestbody, {responseType: 'json'});
  }

  updatePassword(requestbody : PasswordUpdateRequest): Observable<any> {
    return this.http.patch('/api/v1.0/placement-management/users/register', requestbody, {responseType: 'text'})
  }

  setUser(user: User | undefined){
    if(user){
      this.user.next(user);
      localStorage.setItem('userInfo', JSON.stringify(user));
    }
  }

  getUser(): Observable<User | undefined> {
    const userData = localStorage.getItem('userInfo');
    if(userData){
      this.user.next(JSON.parse(userData));
    }
    return this.user;
  }

  removeUser() {
    localStorage.removeItem('userInfo');
  }
}
