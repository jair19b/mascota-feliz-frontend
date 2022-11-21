import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout/layout.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { AsideComponent } from "./aside/aside.component";
import { ListarComponent } from "./listar/listar.component";
import { AfiliarComponent } from "./afiliar/afiliar.component";
import { AdministrarComponent } from "./administrar/administrar.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [LayoutComponent, NavbarComponent, AsideComponent, ListarComponent, AfiliarComponent, AdministrarComponent],
    imports: [CommonModule, ReactiveFormsModule, AdminRoutingModule],
    exports: [AsideComponent, NavbarComponent]
})
export class AdminModule {}
