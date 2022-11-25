import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidatorService } from "./../../services/validator.service";
import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";
import { HttpServiceService } from "./../../services/http-service.service";

@Component({
    selector: "app-forgot",
    templateUrl: "./forgot.component.html",
    styleUrls: ["./forgot.component.scss"]
})
export class ForgotComponent implements OnInit {
    formLogin: FormGroup = this.fb.group({
        email: [""],
        pin: [""]
    });

    title: string = "Activación de Cuentas";
    paste: number = 1;
    private _errorM: any;
    private _successM: any;

    get errorM() {
        return this._errorM;
    }

    get successM() {
        return this._successM;
    }

    constructor(
        private fb: FormBuilder,
        private vs: ValidatorService,
        private authService: AuthService,
        private router: Router,
        public http: HttpServiceService
    ) {}

    ngOnInit(): void {}

    campoEsValido(campo: string) {
        return this.formLogin.controls[campo]?.errors && this.formLogin.controls[campo].touched;
    }

    getError(campo: string): string | null {
        const error = this.formLogin.controls[campo].errors;
        return error ? error["message"] : null;
    }

    enviar() {
        this._errorM = null;
        this._successM = null;
        // if (this.formLogin.invalid) {
        //     this.formLogin.markAllAsTouched();
        //     return;
        // }
        const { email, pin } = this.formLogin.getRawValue();
        this.forgotPassword(email, pin);
    }

    forgotPassword(email: string, pin?: string) {
        if (email && !pin) {
            this.http.postDatos("auth/forgot-password", { email }).subscribe({
                next: resp => (this.paste = 2),
                error: err => (this._errorM = err.error.error.message)
            });
        }

        if (email && pin) {
            this.http.postDatos("auth/forgot-password", { email }).subscribe({
                next: resp => {
                    this._successM = "Contraseña actualizada correctamente";
                    setTimeout(() => {
                        this.router.navigateByUrl("auth/login");
                    }, 3000);
                },
                error: err => (this._errorM = err.error.error.message)
            });
        }
    }
}
