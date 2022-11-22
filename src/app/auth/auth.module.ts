import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { VerifyComponent } from "./verify/verify.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NzAlertModule } from "ng-zorro-antd/alert";

@NgModule({
    declarations: [LoginComponent, RegisterComponent, VerifyComponent],
    imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, NzAlertModule],
    exports: []
})
export class AuthModule {}
