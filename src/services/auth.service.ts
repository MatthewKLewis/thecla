import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface userCredential {
  username: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  tokenSubscription = new Subscription()
  timeout!: number | null;

  constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService) { 
    this.retreiveToken();
  }

  //http://localhost:8080/
  createAccount(userCred: userCredential) {
    return this.http.post('http://localhost:8080/api/users/createUser', userCred);
  }

  login(userCred: userCredential) {
    return this.http.post('http://localhost:8080/api/users/login', userCred).subscribe((res:any)=>{
      this.storeUserData(res)

      if (this.isExpired()) {
        console.log("Expired JWT back from server?")
      }
      else {
        this.router.navigate(['dashboard'])
      }
     })
  }

  logout() {
    this.tokenSubscription.unsubscribe();
    localStorage.clear();
    this.user = null;
    this.router.navigate(['']);
  }

  isExpired(): boolean {
    const token = localStorage.getItem('token');
    if (token !=null) { 
      return this.jwtHelper.isTokenExpired(token); 
    } 
    else { 
      return true 
    }
  }

  storeUserData(data:any) {
    var timeoutDate = this.jwtHelper.getTokenExpirationDate(data.token);
    this.timeout = timeoutDate && timeoutDate.valueOf() - new Date().valueOf();
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    this.expirationCounter(this.timeout);
  }

  retreiveToken() {
   var userstring = localStorage.getItem('user');
   if (userstring) {
    this.user = JSON.parse(userstring);
   }   
   return localStorage.getItem('token');
  }

  expirationCounter(timeout: number | null) {
    if (timeout != null) {
      this.tokenSubscription.unsubscribe();
      this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
        console.log('EXPIRED!!');
  
        this.logout();
        this.router.navigate(["/login"]);
      });
    }
  }
}
