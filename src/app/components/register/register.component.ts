import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { RegisterUserRequest } from "src/app/interfaces/RegisterUserRequest";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userAdded: boolean = false;
  errorMessage: string | undefined;
  registerForm: FormGroup = new FormGroup({
    'useremail': new FormControl(null, [Validators.required, Validators.email]),
    'firstname': new FormControl(null, Validators.required),
    'lastname': new FormControl(null, Validators.required),
    'school': new FormControl(null, Validators.required),
    'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern("[a-zA-Z0-9]+")]),
  });

  schoolList : string[] = [
    'Computing and Mathematical Sciences',
    'Chemistry',
    'Life Sciences',
    'Engineering'
    ];
  userRole: string | undefined;

  constructor(private userService: UserService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userAdded = false;
    this.errorMessage = undefined;
    this.registerForm.reset();

    this.route.queryParams.subscribe(params => 
      this.userRole = params?.['role']
    )
  }

  onRegister() {

    this.userAdded = false;
    this.errorMessage = undefined;

    const requestBody = new RegisterUserRequest(this.registerForm.value.useremail,
      this.registerForm.value.password,
      this.registerForm.value.firstname, this.registerForm.value.lastname, this.registerForm.value.school, this.userRole ?? 'Student');

    this.userService.registerUser(requestBody).subscribe({
      next: () => {
        this.userAdded = true;
        window.scrollTo(0, 0)
      },
      error: (error) => {
        this.errorMessage = error.error;
        window.scrollTo(0, 0)
      }
    });
  }

}
