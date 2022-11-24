import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./../services/auth.service";

@Injectable({
    providedIn: "root"
})
export class AdminGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> | boolean {
        const user = this.authService.user;
        const verify = !user || user.rol != "admin" ? false : true;
        if (!verify) this.router.navigateByUrl("/auth/login");
        return verify;
    }

    canLoad(): Observable<boolean> | boolean {
        const user = this.authService.user;
        const verify = !user || user.rol != "admin" ? false : true;
        if (!verify) this.router.navigateByUrl("/auth/login");
        return verify;
    }
}
