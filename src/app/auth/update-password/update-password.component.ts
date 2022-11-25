import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidatorService } from "./../../services/validator.service";
import { AuthService } from "./../../services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpServiceService } from "./../../services/http-service.service";

@Component({
    selector: "app-update-password",
    templateUrl: "./update-password.component.html",
    styleUrls: ["./update-password.component.scss"]
})
export class UpdatePasswordComponent implements OnInit {
    formLogin: FormGroup = this.fb.group({
        email: [""],
        oldPassword: ["", this.vs.validRequired],
        password: ["", this.vs.validRequired]
    });

    title: string = "Activación de Cuentas";
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
        private _router: ActivatedRoute,
        public http: HttpServiceService
    ) {}

    ngOnInit(): void {
        const em = this._router.snapshot.paramMap.get("email");
        if (!em) this.router.navigateByUrl("auth/login");
        let oup = atob(em!);
        this.formLogin.get("email")?.setValue(oup);
    }

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
        if (this.formLogin.invalid) {
            this.formLogin.markAllAsTouched();
            return;
        }
        const datos = this.formLogin.getRawValue();
        this.updatePassword(datos);
    }

    updatePassword(datos: any) {
        this.http.postDatos("auth/change-password", datos).subscribe({
            next: resp => {
                this._successM = "Contraseña cambiada corectamente";
                setTimeout(() => {
                    this.authService.setCredential(resp);
                }, 2000);
            },
            error: err => (this._errorM = err.error.error.message)
        });
    }
}
