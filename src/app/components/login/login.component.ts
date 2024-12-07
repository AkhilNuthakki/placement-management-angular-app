import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../services/user/user.service";
import { User } from "../../interfaces/User.model";
import { LoginUserRequest } from "../../interfaces/LoginUserRequest";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user: User | undefined;
  errorMessage: string | undefined;
  loginForm: FormGroup = new FormGroup({
    'useremail': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, Validators.required),
  });

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
      this.errorMessage = undefined;
  }

  onLogin() {
    this.errorMessage = undefined;

    const requestBody = new LoginUserRequest(this.loginForm.value.useremail, this.loginForm.value.password);

    this.userService.loginUser(requestBody).subscribe({
      next: (user) => {
        this.user = user;
        this.userService.setUser(this.user);
        this.router.navigate(['/requests']);
      }, error: (error) => {
        this.errorMessage = error.error;
      }
    });


  }

}
