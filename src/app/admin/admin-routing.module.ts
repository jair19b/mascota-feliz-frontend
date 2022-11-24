import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdministrarComponent } from "./administrar/administrar.component";
import { AfiliarComponent } from "./afiliar/afiliar.component";
import { ListarComponent } from "./listar/listar.component";
import { PedidosComponent } from "./pedidos/pedidos.component";
import { UsersComponent } from "./users/users.component";

export const routes: Routes = [
    {
        path: "",
        children: [
            { path: "listar", component: ListarComponent },
            { path: "afiliar", component: AfiliarComponent },
            { path: "administrar", component: AdministrarComponent },
            { path: "users", component: UsersComponent },
            { path: "productos", component: PedidosComponent },
            { path: "my-list", component: PedidosComponent },
            { path: "**", component: ListarComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
