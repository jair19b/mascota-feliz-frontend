import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormSolicitudComponent } from "./form-solicitud/form-solicitud.component";
import { HomeComponent } from "./home/home.component";
import { ListaComponent } from "./lista/lista.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        children: [
            { path: "listar", component: ListaComponent },
            { path: "afiliar", component: FormSolicitudComponent },
            { path: "**", component: HomeComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DasboardRoutingModule {}
