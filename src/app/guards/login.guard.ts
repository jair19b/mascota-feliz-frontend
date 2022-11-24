import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./../services/auth.service";

@Injectable({
    providedIn: "root"
})
export class LoginGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> | boolean {
        this.authService.redirect();
        return true;
    }

    canLoad(): Observable<boolean> | boolean {
        this.authService.redirect();
        return true;
    }
}
