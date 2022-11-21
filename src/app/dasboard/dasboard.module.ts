import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { ListaComponent } from "./lista/lista.component";
import { DasboardRoutingModule } from "./dasboard-routing.module";
import { FormSolicitudComponent } from "./form-solicitud/form-solicitud.component";

@NgModule({
    declarations: [HomeComponent, ListaComponent, FormSolicitudComponent],
    imports: [CommonModule, DasboardRoutingModule]
})
export class DasboardModule {}
