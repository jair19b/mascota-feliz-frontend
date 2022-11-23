import { Component, OnInit } from "@angular/core";
import { ValidatorService } from "src/app/services/validator.service";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { HttpServiceService } from "./../../services/http-service.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";

@Component({
    selector: "app-afiliar",
    templateUrl: "./afiliar.component.html",
    styleUrls: ["./afiliar.component.scss"]
})
export class AfiliarComponent implements OnInit {
    requestForm: FormGroup = this.fb.group({
        name: ["", this.vs.validName],
        age: ["", this.vs.validAgePet],
        breed: ["", this.vs.validName],
        color: ["", this.vs.validName],
        city: ["", this.vs.validName],
        address: ["", this.vs.validAddress],
        date: [""],
        description: ["", this.vs.validRequired],
        ownerId: [""]
    });

    isDisable: boolean = false;
    private _user: any;
    private _errorM: any;

    get errorM() {
        return this._errorM;
    }

    constructor(
        public fb: FormBuilder,
        public vs: ValidatorService,
        public httpService: HttpServiceService,
        private router: Router,
        private modalService: NzModalService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this._user = this.authService.user;
        this.requestForm.get("ownerId")?.setValue(this._user.uid);
        this.requestForm.get("date")?.setValue(Date.now());
    }

    campoEsValido(campo: string) {
        return this.requestForm.controls[campo]?.errors && this.requestForm.controls[campo].touched;
    }

    getError(campo: string): string {
        const error = this.requestForm.controls[campo].errors;

        return error ? error["message"] : null;
    }

    enviar() {
        if (this.requestForm.invalid) {
            this.requestForm.markAllAsTouched();
            return;
        }

        this.httpService.postDatos("requests", this.requestForm.getRawValue()).subscribe({
            next: response => {
                console.log(response);
                this._errorM = "Solicitud realizada correctamente";
                this.requestForm.reset({
                    name: "",
                    age: "",
                    breed: "",
                    color: "",
                    city: "",
                    address: "",
                    date: "",
                    description: "",
                    ownerId: ""
                });
                setTimeout(() => {
                    this._errorM = null;
                }, 4000);
            },
            error: error => {
                this.modalService.error({
                    nzTitle: "Error",
                    nzContent: error?.error?.error?.message
                });
            }
        });
    }
}
