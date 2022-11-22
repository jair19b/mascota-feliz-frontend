import { Component, OnInit } from "@angular/core";
import { UserProfile } from "src/app/interfaces";
import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-admin-layout",
    templateUrl: "./admin-layout.component.html",
    styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
    profile: UserProfile | null;

    constructor(private auth: AuthService, public router: Router) {
        this.profile = this.auth.user;
    }

    ngOnInit(): void {
        if (!this.profile) {
            this.router.navigate(["auth/login"]);
        }
    }
}
