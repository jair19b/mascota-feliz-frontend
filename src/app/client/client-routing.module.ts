import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AfiliarComponent } from "./afiliar/afiliar.component";
import { DetailsComponent } from "./details/details.component";
import { ListarComponent } from "./listar/listar.component";

export const routes: Routes = [
    {
        path: "",
        children: [
            { path: "listar", component: ListarComponent },
            { path: "afiliar", component: AfiliarComponent },
            { path: "details/:id", component: DetailsComponent },
            { path: "**", component: ListarComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule {}
