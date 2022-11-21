import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidatorService } from "src/app/services/validator.service";

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

    constructor(public fb: FormBuilder, public vs: ValidatorService) {}

    ngOnInit(): void {
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
    }
}
