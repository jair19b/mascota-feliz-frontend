import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ValidatorService } from "./../../services/validator.service";
import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
    formRegister: FormGroup = this.fb.group({
        cedula: ["", [this.vs.validRequired]],
        name: ["", [this.vs.validRequired]],
        lastName: ["", [this.vs.validName]],
        birthday: ["", [this.vs.validRequired]],
        gender: ["", [this.vs.validRequired]],
        cellphone: ["", [this.vs.validRequired]],
        city: ["", [this.vs.validName]],
        address: ["", [this.vs.validAddress]],
        email: ["", [this.vs.validEmail]],
        password: ["", [this.vs.validRequired]],
        rol: ["cliente"],
        locationId: ["637a1244f4da53204cbab30e"]
    });

    get errorM() {
        return this.authService.registerError;
    }

    constructor(public fb: FormBuilder, public vs: ValidatorService, public authService: AuthService, public router: Router) {}

    ngOnInit(): void {
        this.authService.redirect();
    }

    campoEsValido(campo: string) {
        return this.formRegister.controls[campo]?.errors && this.formRegister.controls[campo].touched;
    }

    getError(campo: string): string | null {
        const error = this.formRegister.controls[campo].errors;
        return error ? error["message"] : null;
    }

    enviar() {
        if (this.formRegister.invalid) {
            this.formRegister.markAllAsTouched();
            return;
        }
        const datos = this.formRegister.getRawValue();
        this.authService.register(datos);
    }
}
