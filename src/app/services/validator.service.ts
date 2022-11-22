import { Injectable } from "@angular/core";
import { FormControl, ValidationErrors } from "@angular/forms";

@Injectable({ providedIn: "root" })
export class ValidatorService {
    public expNames: string = "/^[a-záéíóú]+(s[a-záéíóú]+)*$/gi";
    public expCedula: string = "/^[0-9]{7,15}$/gi";
    public expAddress: string = "/^[a-z]+(s[a-z0-9#-])*/gi";
    public expCellphone: string = "/^[0-9]{10,15}$/gi";
    public expEmail: string = "/^[a-z0-9_-]+(?:.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/gi";

    constructor() {}

    validName(control: FormControl): ValidationErrors | null {
        const valor = control.value?.trim();
        if (valor.length < 1) {
            return {
                message: "Este campo es requerido"
            };
        }
        if (!valor.match(/^[a-záéíóú]+(s[a-záéíóú]+)*$/gi)) {
            return {
                message: "Este campo tiene carácteres no permitidos"
            };
        }

        return null;
    }

    validAgePet(control: FormControl): ValidationErrors | null {
        const valor = control.value?.trim();

        if (!valor.match(/^[0-9]+$/gi)) {
            return {
                message: "Este campo debe contener números"
            };
        }

        if (valor < 1) {
            return {
                message: "Este campo es requerido"
            };
        }
        return null;
    }

    validAddress(control: FormControl): ValidationErrors | null {
        const valor = control.value?.trim();
        if (valor.length < 1) {
            return {
                message: "Este campo es requerido"
            };
        }
        if (!valor.match(/^[a-z]+(s[a-z0-9#-])*/gi)) {
            return {
                message: "Este campo tiene carácteres no permitidos"
            };
        }

        return null;
    }

    validEmail(control: FormControl): ValidationErrors | null {
        const valor = control.value?.trim();
        if (!valor.match(/^[a-z0-9_-]+(?:.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/gi)) {
            return {
                message: "Formato de email inválido"
            };
        }

        return null;
    }

    validRequired(control: FormControl): ValidationErrors | null {
        const valor = control.value?.trim();
        if (valor.length < 1) {
            return {
                message: "Este campo es requerido"
            };
        }
        return null;
    }
}
