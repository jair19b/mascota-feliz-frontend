import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ValidatorService } from "./../../services/validator.service";
import { HttpServiceService } from "./../../services/http-service.service";
import { Router } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
    selector: "shared-form-edit-user",
    templateUrl: "./form-edit-user.component.html",
    styleUrls: ["./form-edit-user.component.scss"]
})
export class FormEditUserComponent implements OnInit {
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
        rol: ["", this.vs.validRequired],
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

    @Input() currentUser: any;
    @Output() onStateOperation: EventEmitter<any> = new EventEmitter();

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

        this.userForm.reset({ ...this.currentUser });
    }

    campoEsValido(campo: string) {
        return this.userForm.controls[campo]?.errors && this.userForm.controls[campo].touched;
    }

    getError(campo: string): string {
        const error = this.userForm.controls[campo].errors;

        return error ? error["message"] : null;
    }

    enviar() {
        if (this.userForm.invalid) {
            this.userForm.markAllAsTouched();
            return;
        }
        const datos = this.userForm.getRawValue();
        this.httpService.modificarDatosFilter(`users/${this.currentUser.id}`, datos, {}).subscribe({
            next: response => {
                this.onStateOperation.emit({ id: this.currentUser.id, ...datos });
            },
            error: error => (this._errorM = error.error.error.message)
        });
    }
}
