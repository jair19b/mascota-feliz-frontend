import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { UserProfile } from "./interfaces/perfiles.interface";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    title = "mascota-feliz-frontend";
    profile: UserProfile | null;
    loggedIn: boolean = false;

    constructor(private authService: AuthService) {
        this.profile = this.authService.user;
    }

    ngOnInit(): void {
        if (!this.profile) {
            this.loggedIn = false;
        } else {
            this.loggedIn = true;
        }
    }
}
