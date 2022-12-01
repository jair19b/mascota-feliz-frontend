import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { ValidatorService } from "../../services/validator.service";
import { HttpServiceService } from "./../../services/http-service.service";
import { Router } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";
const moment = require("moment");

@Component({
    selector: "app-form-edit-pet",
    templateUrl: "./form-edit-pet.component.html",
    styleUrls: ["./form-edit-pet.component.scss"]
})
export class FormEditPetComponent implements OnInit {
    requestForm: FormGroup = this.fb.group({
        name: ["", this.vs.validName],
        age: [""],
        breed: ["", this.vs.validName],
        color: ["", this.vs.validName],
        description: ["", this.vs.validRequired]
    });

    isDisable: boolean = false;
    users: any[] = [];

    private _errorM: any;
    private _successM: any;

    get errorM() {
        return this._errorM;
    }

    get successM() {
        return this._successM;
    }

    @Input() currentPet: any;
    @Output() onStateOperation: EventEmitter<any> = new EventEmitter();

    constructor(
        public fb: FormBuilder,
        public vs: ValidatorService,
        public httpService: HttpServiceService,
        private router: Router,
        private modalService: NzModalService
    ) {}

    ngOnInit(): void {
        this.requestForm.reset({
            name: this.currentPet.pet.name,
            age: this.currentPet.pet.age,
            breed: this.currentPet.pet.breed,
            color: this.currentPet.pet.color,
            description: this.currentPet.pet.description
        });
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

        const data = this.requestForm.getRawValue();
        data.age = parseInt(data.age);
        const petData = {
            ...this.currentPet.pet,
            name: data.name,
            age: data.age,
            breed: data.breed,
            color: data.color,
            description: data.description
        };
        const returnData = { ...this.currentPet, pet: { ...petData } };
        this.httpService.modificarDatosFilter("pets", data, {}).subscribe({
            next: response => {
                this.onStateOperation.emit({ id: this.currentPet.id, ...returnData });
            },
            error: error => (this._errorM = error.error.error.message)
        });
    }
}
