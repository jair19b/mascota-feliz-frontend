import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserProfile } from "../interfaces";
import { AuthService } from "./../services/auth.service";

@Injectable({
    providedIn: "root"
})
export class AdminAuthGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> | boolean {
        return this.authService.validarSession();
    }
    canLoad(): Observable<boolean> | boolean {
        return this.authService.validarSession();
    }
}
