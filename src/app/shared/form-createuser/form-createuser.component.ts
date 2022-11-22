import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ValidatorService } from "./../../services/validator.service";
import { HttpServiceService } from "./../../services/http-service.service";
import { Router } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
    selector: "shared-form-createuser",
    templateUrl: "./form-createuser.component.html",
    styleUrls: ["./form-createuser.component.scss"]
})
export class FormCreateuserComponent implements OnInit {
    userForm: FormGroup = this.fb.group({
        status: ["", this.vs.validRequired],
        cedula: ["", this.vs.validRequired],
        name: ["", this.vs.validRequired],
        lastName: ["", this.vs.validRequired],
        birthday: ["", this.vs.validRequired],
        gender: ["", this.vs.validRequired],
        cellphone: ["", this.vs.validRequired],
        city: ["", this.vs.validRequired],
        address: ["", this.vs.validRequired],
        email: ["", this.vs.validRequired],
        password: ["default"],
        rol: ["", this.vs.validRequired],
        activationKey: [""],
        locationId: ["", this.vs.validRequired]
    });

    isDisable: boolean = false;
    sedes: any[] = [];
    private _errorM: any;
    private _successM: any;

    get errorM() {
        return this._errorM;
    }

    get successM() {
        return this._successM;
    }

    constructor(
        public fb: FormBuilder,
        public vs: ValidatorService,
        public httpService: HttpServiceService,
        private router: Router,
        private modalService: NzModalService
    ) {}

    ngOnInit(): void {
        this.userForm.get("date")?.setValue(Date.now());
        this.httpService.obetenerDatosFilter("sede", {}).subscribe({
            next: res => (this.sedes = res),
            error: err => console.error(err)
        });
    }

    campoEsValido(campo: string) {
        return this.userForm.controls[campo]?.errors && this.userForm.controls[campo].touched;
    }

    getError(campo: string): string {
        const error = this.userForm.controls[campo].errors;

        return error ? error["message"] : null;
    }

    enviar() {
        console.log(this.userForm);
        if (this.userForm.invalid) {
            this.userForm.markAllAsTouched();
            return;
        }

        const datos = this.userForm.getRawValue();

        this.httpService.postDatos("users", datos).subscribe({
            next: response => {
                console.log(response);
                this._successM = "Usuario creado correctamente";
                this.userForm.reset({
                    status: "",
                    cedula: "",
                    name: "",
                    lastName: "",
                    birthday: "",
                    gender: "",
                    cellphone: "",
                    city: "",
                    address: "",
                    email: "",
                    password: "",
                    rol: "",
                    activationKey: "",
                    locationId: ""
                });
            },
            error: error => (this._errorM = error.error.error.message)
        });
    }
}
