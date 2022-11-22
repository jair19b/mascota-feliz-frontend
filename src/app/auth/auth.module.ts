import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { VerifyComponent } from "./verify/verify.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [LoginComponent, RegisterComponent, VerifyComponent],
    imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
    exports: [LoginComponent, RegisterComponent, VerifyComponent]
})
export class AuthModule {}
