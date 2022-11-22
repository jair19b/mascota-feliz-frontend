import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdministrarComponent } from "./administrar/administrar.component";
import { AfiliarComponent } from "./afiliar/afiliar.component";
import { ListarComponent } from "./listar/listar.component";

export const routes: Routes = [
    {
        path: "",
        component: ListarComponent,
        children: [
            { path: "listar", component: ListarComponent },
            { path: "afiliar", component: AfiliarComponent },
            { path: "administrar", component: AdministrarComponent },
            { path: "**", component: ListarComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
