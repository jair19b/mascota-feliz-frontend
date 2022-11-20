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
        path: "**",
        component: IndexComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
