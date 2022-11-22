import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AsideComponent } from "./aside/aside.component";
import { ListarComponent } from "./listar/listar.component";
import { AfiliarComponent } from "./afiliar/afiliar.component";
import { AdministrarComponent } from "./administrar/administrar.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NzModalModule } from "ng-zorro-antd/modal";
import { UsersComponent } from "./users/users.component";
import { PedidosComponent } from "./pedidos/pedidos.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [AsideComponent, ListarComponent, AfiliarComponent, AdministrarComponent, UsersComponent, PedidosComponent],
    imports: [CommonModule, ReactiveFormsModule, AdminRoutingModule, NzModalModule, SharedModule],
    exports: [AsideComponent]
})
export class AdminModule {}
