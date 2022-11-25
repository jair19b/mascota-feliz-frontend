import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserProfile } from "../interfaces";
import { HttpServiceService } from "./http-service.service";

@Injectable({ providedIn: "root" })
export class AuthService {
    private _user!: UserProfile | null;
    private _loginError: any;
    private _registerError: any;

    get user() {
        return { ...this._user };
    }

    get loginError() {
        return this._loginError;
    }

    get registerError() {
        return this._registerError;
    }

    constructor(public http: HttpServiceService, public router: Router) {}

    login(email: string, password: string) {
        this.http.postDatos("auth/login", { email, password }).subscribe({
            next: response => {
                if (response.token) {
                    this.setCredential(response);
                }
            },
            error: err => {
                const ouput = btoa(email);
                if (err.error.error.statusCode == 403) this.router.navigateByUrl(`auth/update-password/${ouput}`);
                this._loginError = err.error.error.message;
            }
        });
    }

    setCredential(response: any) {
        localStorage.setItem("token", response.token);
        delete response["token"];
        localStorage.setItem("profile", JSON.stringify(response));
        this._user = response;

        if (response.rol == "admin") {
            this.router.navigate(["dashboard"]);
        }
        if (response.rol == "advisor") {
            this.router.navigate(["advisor"]);
        }
        if (response.rol == "cliente") {
            this.router.navigate(["user"]);
        }

        this._loginError = null;
        this._registerError = null;
    }

    verify(email: string, pin: string) {
        this.http.postDatos("auth/verify/account", { email, pin }).subscribe({
            next: response => {
                this.router.navigateByUrl("auth/login");
            },
            error: err => {
                this._loginError = err.error.error.message;
            }
        });
    }

    register(datos: any) {
        console.log(datos);
        this.http.postDatos("auth/register", datos).subscribe({
            next: response => {
                console.log(response);
                this.router.navigateByUrl("/auth/verify");
            },
            error: err => {
                this._registerError = err.error.error.message;
                console.log(err);
            }
        });
    }

    redirect() {
        if (this.user) {
            if (this.user?.rol == "admin") {
                this.router.navigate(["dashboard"]);
            }
            if (this.user?.rol == "advisor") {
                this.router.navigate(["advisor"]);
            }
            if (this.user?.rol == "cliente") {
                this.router.navigate(["user"]);
            }
        }
    }

    validarSession(): boolean {
        const localToken = localStorage.getItem("token");
        const localProfile = localStorage.getItem("profile");
        if (localToken && localProfile) {
            this._user = JSON.parse(localProfile);
            return true;
        }
        return false;
    }

    logout() {
        this._user = null;
        localStorage.clear();
        this.router.navigateByUrl("");
    }
}
