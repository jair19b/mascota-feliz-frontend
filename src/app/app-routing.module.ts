import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "./guards/admin.guard";
import { AdvisorGuard } from "./guards/avisor.guard";
import { LoginGuard } from "./guards/login.guard";
import { UserGuard } from "./guards/user.guard";
import { IndexComponent } from "./home/components/index.component";

const routes: Routes = [
    {
        path: "",
        component: IndexComponent,
        pathMatch: "full"
    },
    {
        path: "auth",
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule),
        canActivate: [LoginGuard],
        canLoad: [LoginGuard]
    },
    {
        path: "dashboard",
        loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule),
        canActivate: [AdminGuard],
        canLoad: [AdminGuard]
    },
    {
        path: "advisor",
        loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule),
        canActivate: [AdvisorGuard],
        canLoad: [AdvisorGuard]
    },
    {
        path: "user",
        loadChildren: () => import("./client/client.module").then(m => m.ClientModule),
        canActivate: [UserGuard],
        canLoad: [UserGuard]
    },
    {
        path: "**",
        redirectTo: ""
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
