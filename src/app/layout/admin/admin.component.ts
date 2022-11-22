import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../services/auth.service";
import { UserProfile } from "./../../interfaces/perfiles.interface";

@Component({
    selector: "admin-layout",
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
    profile: UserProfile | null;

    constructor(private aut: AuthService) {
        this.profile = this.aut.user;
    }

    ngOnInit(): void {}
}
