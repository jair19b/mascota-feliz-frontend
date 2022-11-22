import { Injectable } from "@angular/core";
import { FormControl, ValidationErrors } from "@angular/forms";

@Injectable({ providedIn: "root" })
export class ValidatorService {
    private expNames: string = "/^[a-záéíóú]+(s[a-záéíóú]+)*$/gi";
    private expCedula: string = "/^[0-9]{7,15}$/gi";
    private expAddress: string = "/^[a-z]+(s[a-z0-9#-])*/gi";
    private expCellphone: string = "/^[0-9]{10,15}$/gi";
    private expEmail: string = "/^[a-z0-9_-]+(?:.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/gi";

    constructor() {}

    validName(control: FormControl): ValidationErrors | null {
        const valor: string = control.value?.trim();
        if (valor.length == 0) return { message: "Este campo es requerido" };
        if (!valor.match(/^[a-z]+(s[a-z]+)*$/gi)) ({ message: "Este campo tiene carácteres no permitidos" });
        return null;
    }

    validAgePet(control: FormControl): ValidationErrors | null {
        const valor: string = control.value?.trim();
        if (valor.length == 0) return { message: "Este campo es requerido" };
        if (!valor.match(/^[0-9]+$/gi)) ({ message: "Este campo tiene carácteres no permitidos" });
        return null;
    }

    validAddress(control: FormControl): ValidationErrors | null {
        const valor: string = control.value?.trim();
        if (valor.length == 0) return { message: "Este campo es requerido" };
        if (!valor.match(/^[a-z]+(s[a-z0-9#-])*/gi)) ({ message: "Este campo tiene carácteres no permitidos" });
        return null;
    }

    validEmail(control: FormControl): ValidationErrors | null {
        const valor = control.value?.trim();
        if (!valor.match(/^[a-z0-9_-]+(?:.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/gi))
            return { message: "El formato del email es inválido" };
        return null;
    }

    validRequired(control: FormControl): ValidationErrors | null {
        const valor: string = control.value?.trim();
        if (valor.length == 0) return { message: "Este campo es requerido" };
        return null;
    }
}
