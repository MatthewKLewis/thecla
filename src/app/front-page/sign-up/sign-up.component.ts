import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: any;

  constructor(private formBuilder: FormBuilder, public authService: AuthService, private notifier: MatSnackBar) {
    this.signUpForm = this.formBuilder.group({
      'username': ['', [
        Validators.required,
        Validators.minLength(4),
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(4),
      ]],
      'email': ['', [
        Validators.required,
        Validators.minLength(4),
      ]],
    });
  }

  ngOnInit() {
  }

  signUp() {
    if (this.signUpForm.valid) {
      this.authService.createAccount(this.signUpForm.value).subscribe((res: any) => {
        if (res == "error") {
          console.log("error");
        } else {
          console.log("success");
        }
      })
    }
    else {
      let ref = this.notifier.open("Error", 'Apologize', {duration: 3000});
      ref.onAction().subscribe(() => {
        this.notifier.open("Your admission of fault has been recorded.");
      });
    }
  }

}
