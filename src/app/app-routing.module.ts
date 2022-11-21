import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./auth/register/register.component";
import { IndexComponent } from "./home/components/index.component";

const routes: Routes = [
    {
        path: "",
        component: IndexComponent,
        pathMatch: "full"
    },
    {
        path: "auth",
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
    },
    {
        path: "**",
        component: IndexComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
