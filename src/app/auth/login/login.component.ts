import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { ValidatorService } from "./../../services/validator.service";
import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    formLogin: FormGroup = this.fb.group({
        email: ["", this.vs.validEmail],
        password: ["", this.vs.validRequired]
    });

    constructor(private fb: FormBuilder, private vs: ValidatorService, private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.authService.redirect();
    }

    campoEsValido(campo: string) {
        return this.formLogin.controls[campo]?.errors && this.formLogin.controls[campo].touched;
    }

    getError(campo: string): string {
        const error = this.formLogin.controls[campo].errors;

        return error ? error["message"] : null;
    }

    enviar() {
        if (this.formLogin.invalid) {
            this.formLogin.markAsTouched();
            return;
        }
        this.authService.login(this.formLogin.get("email")?.value, this.formLogin.get("password")?.value);
    }
}
