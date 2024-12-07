import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean = false;
  isStudent : boolean = false;
  isTutor : boolean = false;
  isProvider : boolean = false;
  userRole: string | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
      this.userService.getUser().subscribe({ next : (user) => {
        if(user){
          this.isAuth = true;
          this.userRole = user.user_role;
          this.isStudent = user.user_role == 'STUDENT' ? true : false;
          this.isTutor = user.user_role == 'TUTOR' ? true : false;
          this.isProvider = user.user_role == 'PROVIDER' ? true : false; 
        }
      }
      });
  }

  onLogout(){
    this.userService.removeUser();
  }

}
