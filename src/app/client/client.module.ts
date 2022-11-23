import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListarComponent } from "./listar/listar.component";
import { AfiliarComponent } from "./afiliar/afiliar.component";
import { ClientRoutingModule } from "./client-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NzModalModule } from "ng-zorro-antd/modal";
import { AsideComponent } from "./aside/aside.component";
import { NzAlertModule } from "ng-zorro-antd/alert";

@NgModule({
    declarations: [ListarComponent, AfiliarComponent, AsideComponent],
    imports: [CommonModule, ReactiveFormsModule, ClientRoutingModule, NzModalModule, NzAlertModule],
    exports: [AsideComponent]
})
export class ClientModule {}
