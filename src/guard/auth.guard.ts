import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {
        if (this.authService.isExpired()) {
            console.log("sike")
            this.router.navigate(['']);
            return false
        } else {
            return true
        }
    }
}