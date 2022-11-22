import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../services/auth.service";

@Component({
    selector: "app-index",
    templateUrl: "../pages/index.component.html",
    styleUrls: ["../styles/index.component.scss"]
})
export class IndexComponent implements OnInit {
    get profile() {
        return this.authService.user;
    }

    get loggedIn() {
        return this.authService.validarSession();
    }

    constructor(public authService: AuthService) {}

    ngOnInit(): void {
        this.authService.redirect();
    }
}
