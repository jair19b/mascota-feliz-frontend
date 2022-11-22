import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    get profile() {
        return this.authService.user;
    }

    get loggedIn() {
        return this.authService.validarSession();
    }

    constructor(private authService: AuthService) {}

    ngOnInit(): void {}
}
