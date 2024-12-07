import { Component, OnInit } from '@angular/core';
import { RequestCountGroupByStatus } from 'src/app/interfaces/RequestCountGroupByStatus.model';
import { RequestCountGroupByStatusAndCourse } from 'src/app/interfaces/RequestCountGroupByStatusAndCourse.model';
import { RequestCountGroupByStatusAndProviderName } from 'src/app/interfaces/RequestCountGroupByStatusAndProviderName.model';
import { User } from 'src/app/interfaces/User.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user : User | undefined;
  requestCount : RequestCountGroupByStatus[] = [];
  requestCountByCourse : RequestCountGroupByStatusAndCourse[] = [];
  requestCountByProviderName : RequestCountGroupByStatusAndProviderName[] = [];

  constructor(private dashboardService: DashboardService,
    private userService: UserService) {
  }

  ngOnInit() {

    this.userService.getUser().subscribe({next : (user) =>{
      if(user){
        this.user = user;
      }
    }})

    if(this.user?.school != undefined || this.user?.school != null){

      //Fetch Total count group by request status
      this.dashboardService.getRequestsFromSchoolGroupByStatus(this.user.school).subscribe({
        next: (requestCount) => {
          this.requestCount = requestCount;
        },
        error : (error) => {}
      });

      //Fetch Total count group by request status and course
      this.dashboardService.getRequestsFromSchoolGroupByStatusAndCourse(this.user.school).subscribe({
        next: (requestCount) => {
          this.requestCountByCourse = requestCount;
        },
        error: (error) => { }
      });


      //Fetch Total count group by request status and provider name
      this.dashboardService.getRequestsFromSchoolGroupByStatusAndProviderName(this.user.school).subscribe({
        next: (requestCount) => {
          this.requestCountByProviderName = requestCount;
        },
        error: (error) => { }
      });
    }
  }

  getRequestCountBasedOnStatus(status : string) : Number | void{
    let count = 0;
    if(status === 'SUBMITTED'){
      this.requestCount.forEach((req) => { count = count + (req.count ?? 0)});
    }else{
      this.requestCount.forEach((req) => {if(req.status === status) {count = req.count ?? 0}});
    }
    return count;
  }

  getRequestCountBasedOnStatusAndCourse(courseRequestCount : RequestCountGroupByStatusAndCourse, status : string){
    let count = 0;
    if(status === 'SUBMITTED'){
      courseRequestCount.statuses?.forEach((req) => { count = count + (req.count ?? 0)});
    }else{
      courseRequestCount.statuses?.forEach((req) => {if(req.status === status) {count = req.count ?? 0}});
    }
    return count;
  }

  getRequestCountBasedOnStatusAndProviderName(providerRequestCount : RequestCountGroupByStatusAndProviderName, status : string){
    let count = 0;
    if(status === 'SUBMITTED'){
      providerRequestCount.statuses?.forEach((req) => { count = count + (req.count ?? 0)});
    }else{
      providerRequestCount.statuses?.forEach((req) => {if(req.status === status) {count = req.count ?? 0}});
    }
    return count;
  }
}
