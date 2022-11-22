import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ValidatorService } from "./../../services/validator.service";
import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-verify",
    templateUrl: "./verify.component.html",
    styleUrls: ["./verify.component.scss"]
})
export class VerifyComponent implements OnInit {
    formLogin: FormGroup = this.fb.group({
        email: ["", [this.vs.validEmail]],
        pin: ["", [this.vs.validRequired]]
    });

    title: string = "Activación de Cuentas";

    get errorM() {
        return this.authService.loginError;
    }

    constructor(private fb: FormBuilder, private vs: ValidatorService, private authService: AuthService, private router: Router) {}

    ngOnInit(): void {}

    campoEsValido(campo: string) {
        return this.formLogin.controls[campo]?.errors && this.formLogin.controls[campo].touched;
    }

    getError(campo: string): string | null {
        const error = this.formLogin.controls[campo].errors;
        return error ? error["message"] : null;
    }

    enviar() {
        if (this.formLogin.invalid) {
            this.formLogin.markAllAsTouched();
            return;
        }
        const { email, pin } = this.formLogin.getRawValue();
        this.authService.verify(email, pin);
    }
}
