import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgotComponent } from "./forgot/forgot.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UpdatePasswordComponent } from "./update-password/update-password.component";
import { VerifyComponent } from "./verify/verify.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "login",
                component: LoginComponent
            },
            {
                path: "register",
                component: RegisterComponent
            },
            {
                path: "verify",
                component: VerifyComponent
            },
            {
                path: "forgot-password",
                component: ForgotComponent
            },
            {
                path: "update-password/:email",
                component: UpdatePasswordComponent
            },
            {
                path: "**",
                component: LoginComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
