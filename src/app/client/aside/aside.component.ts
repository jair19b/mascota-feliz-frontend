import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../services/auth.service";

@Component({
    selector: "cliente-aside",
    templateUrl: "./aside.component.html",
    styleUrls: ["./aside.component.scss"]
})
export class AsideComponent implements OnInit {
    constructor(private authService: AuthService) {}

    ngOnInit(): void {}

    logout() {
        this.authService.logout();
    }
}
