import { Component, OnInit } from "@angular/core";
import { ValidatorService } from "src/app/services/validator.service";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { HttpServiceService } from "./../../services/http-service.service";

@Component({
    selector: "admin-afiliar",
    templateUrl: "./afiliar.component.html",
    styleUrls: ["./afiliar.component.scss"]
})
export class AfiliarComponent implements OnInit {
    /**
 {
  "city": "Bogotá",
  "address": "cr 50 cl 34",
  "date": "2022-11-21T19:42:18.906Z",
  "ownerId": "637bd625440f7a0440053946",
  "name": "Casi Luna",
  "age": 3,
  "breed": "Criolla",
  "color": "Blanco",
  "photo": "string",
  "description": "Una perra muy loca"
}
 */

    requestForm: FormGroup = this.fb.group({
        name: ["", this.vs.validName],
        age: ["", this.vs.validAgePet],
        breed: ["", this.vs.validName],
        color: ["", this.vs.validName],
        city: ["", this.vs.validName],
        address: ["", this.vs.validAddress],
        date: [""],
        description: ["", this.vs.validRequired],
        ownerId: ["637bd625440f7a0440053946"]
    });

    isDisable: boolean = false;

    constructor(public fb: FormBuilder, public vs: ValidatorService, public httpService: HttpServiceService) {}

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

        this.httpService.postDatos("requests", this.requestForm.getRawValue()).subscribe({
            next: response => {
                console.log(response);
            },
            error: error => {
                console.log(error);
            }
        });
    }
}
