import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnInit {
  loginForm: FormGroup;
  isLoading = false;
  userList : any [] = []
  username : string = "";


  constructor(
    private fb: FormBuilder ,
    private loginService : LoginService,
    private router : Router) {


    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required,]]
    });

  }

  ngOnInit(): void {

    this.loginService.getUsers().subscribe({
      next: (users) => {
        this.userList = users;

        this.router.navigate(['andina'])
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      }
    });
    console.log(this.userList);


    }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      // TODO: Implement login logic
      this.username = this.loginForm.value.username;
      localStorage.setItem('username', this.username);
      this.loginService.login(this.loginForm.value.username , this.loginForm.value.password)
      console.log(this.loginForm.value);
      this.isLoading = false;
    }
  }
}
