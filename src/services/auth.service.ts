import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

export interface userCredential {
  username: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService) { 
    console.log("constructing the auth service!")
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
    localStorage.clear();
    this.router.navigate(['']);
  }

  isExpired(): boolean {
    const token = localStorage.getItem('token');
    if (token !=null) { return this.jwtHelper.isTokenExpired(token); } 
    else { return true }
  }

  storeUserData(data:any) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  retreiveToken() {
   var userstring = localStorage.getItem('user');
   if (userstring) {
    this.user = JSON.parse(userstring);
   }   
   return localStorage.getItem('token');
  }
}
