import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
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
        path: "dashboard",
        loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)
    },
    {
        path: "user",
        loadChildren: () => import("./client/client.module").then(m => m.ClientModule)
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
