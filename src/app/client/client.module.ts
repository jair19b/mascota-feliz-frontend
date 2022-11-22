import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListarComponent } from "./listar/listar.component";
import { AfiliarComponent } from "./afiliar/afiliar.component";
import { DetailsComponent } from "./details/details.component";
import { ClientRoutingModule } from "./client-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NzModalModule } from "ng-zorro-antd/modal";

@NgModule({
    declarations: [ListarComponent, AfiliarComponent, DetailsComponent],
    imports: [CommonModule, ReactiveFormsModule, ClientRoutingModule, NzModalModule]
})
export class ClientModule {}
