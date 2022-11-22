import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserProfile } from "../interfaces";
import { AuthService } from "./../services/auth.service";

@Injectable({
    providedIn: "root"
})
export class AdminAuthGuard implements CanActivate, CanLoad {
    userProfile: UserProfile | null;

    constructor(private authService: AuthService, private router: Router) {
        this.userProfile = this.authService.user;
    }

    canActivate(): Observable<boolean> | boolean {
        if (!this.userProfile) {
            this.router.navigate(["auth/login"]);
        } else if (this.userProfile.rol != "admin") {
            this.router.navigate(["auth/login"]);
        }
        return true;
    }
    canLoad(): Observable<boolean> | boolean {
        if (!this.userProfile) {
            this.router.navigate(["auth/login"]);
        } else if (this.userProfile.rol != "admin") {
            this.router.navigate(["auth/login"]);
        }
        return true;
    }
}
