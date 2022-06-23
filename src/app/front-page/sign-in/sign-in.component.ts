import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, public authService: AuthService, private router: Router, private notifier: MatSnackBar) { 
    this.signInForm = this.formBuilder.group({
      'username': ['', [
        Validators.required,
        Validators.minLength(4),
      ]],
      'password': ['',  [
        Validators.required,
        Validators.minLength(4),
      ]],
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.signInForm.valid) {
      this.authService.login(this.signInForm.value)
    }
    else {
      let ref = this.notifier.open("Error", 'Apologize', {duration: 3000});
      ref.onAction().subscribe(() => {
        this.notifier.open("Your admission of fault has been recorded.");
      });
    }
  }

}
