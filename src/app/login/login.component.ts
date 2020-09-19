import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  username = 'sachin';
  password = '';
  errorMessage = 'Invalid Credientials';
  loginInvalid = false;

  constructor(
              private router: Router,
              private basicAuthenticationService: BasicAuthenticationService,
              private snackBar: MatSnackBar
              ) { }

  ngOnInit(): void {
  }

  handelBasicAuthLogin() {
      this.basicAuthenticationService.executeAuthenticationService(this.username, this.password).subscribe(
        resp => {
          console.log(resp) ;
          this.router.navigate(['welcome', this.username]);
          this.loginInvalid = false;
        },
        error => {
          console.log(error);
          this.loginInvalid = true;
        }
      );
  }

  handelJWTAuthLogin() {
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['welcome', this.username]);
        this.loginInvalid = false;
      },
      () => {
        this.openSnackBar();
      }
    );
}

openSnackBar() {
  this.snackBar.open('Please enter correct username and password', `${this.errorMessage}`, {
    duration: 4000,
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
}

}
