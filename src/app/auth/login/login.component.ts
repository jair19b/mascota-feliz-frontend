import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { ValidatorService } from "./../../services/validator.service";
import { AuthService } from "./../../services/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    formLogin: FormGroup = this.fb.group({
        email: ["", this.vs.validEmail],
        password: ["", this.vs.validRequired]
    });

    constructor(private fb: FormBuilder, private vs: ValidatorService, private authService: AuthService) {}

    ngOnInit(): void {}

    enviar() {
        if (this.formLogin.invalid) {
            this.formLogin.markAsTouched();
            return;
        }
        this.authService.login(this.formLogin.get("email")?.value, this.formLogin.get("password")?.value);
    }
}
