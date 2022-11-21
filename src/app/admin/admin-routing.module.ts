import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdministrarComponent } from "./administrar/administrar.component";
import { AfiliarComponent } from "./afiliar/afiliar.component";
import { LayoutComponent } from "./layout/layout.component";
import { ListarComponent } from "./listar/listar.component";

export const routes: Routes = [
    {
        path: "",
        children: [
            { path: "listar", component: ListarComponent },
            { path: "afiliar", component: AfiliarComponent },
            { path: "administrar", component: AdministrarComponent },
            { path: "**", component: LayoutComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
