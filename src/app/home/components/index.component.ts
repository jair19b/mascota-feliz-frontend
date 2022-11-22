import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../services/auth.service";
import { UserProfile } from "./../../interfaces/perfiles.interface";

@Component({
    selector: "app-index",
    templateUrl: "../pages/index.component.html",
    styleUrls: ["../styles/index.component.scss"]
})
export class IndexComponent implements OnInit {
    loggedIn: boolean = false;
    profile: UserProfile | null;

    constructor(public auth: AuthService) {
        this.profile = this.auth.user;
    }

    ngOnInit(): void {
        if (this.profile) this.loggedIn = true;
        this.auth.redirect();
    }
}
