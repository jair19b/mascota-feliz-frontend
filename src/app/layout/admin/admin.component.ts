import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../services/auth.service";
import { UserProfile } from "./../../interfaces/perfiles.interface";

@Component({
    selector: "admin-layout",
    templateUrl: "./admin.component.html"
})
export class AdminComponent implements OnInit {
    get user() {
        return this.authService.user;
    }

    constructor(private authService: AuthService) {}

    ngOnInit(): void {}
}
