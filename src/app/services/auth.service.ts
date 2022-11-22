import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserProfile } from "../interfaces";
import { HttpServiceService } from "./http-service.service";

@Injectable({ providedIn: "root" })
export class AuthService {
    user: UserProfile | null = null;
    loginError: any;
    registerError: any;

    constructor(public httpServiceService: HttpServiceService, public router: Router) {
        const localToken = localStorage.getItem("token");
        const localProfile = localStorage.getItem("profile");
        if (localToken && localProfile) {
            this.user = JSON.parse(localProfile);
        } else {
            this.user = null;
        }
    }

    login(email: string, password: string) {
        this.httpServiceService.postDatos("auth/login", { email, password }).subscribe({
            next: response => {
                if (response.token) {
                    localStorage.setItem("token", response.token);
                    delete response["token"];
                    localStorage.setItem("profile", JSON.stringify(response));
                    if (response.rol == "admin") {
                        this.router.navigate(["dashboard"]);
                    }
                    if (response.rol == "advisor") {
                        this.router.navigate(["advisor"]);
                    }
                    if (response.rol == "client") {
                        this.router.navigate(["user"]);
                    }
                }
            },
            error: err => {
                this.loginError = err;
            }
        });
    }
}
