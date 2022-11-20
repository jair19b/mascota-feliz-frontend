import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IndexComponent } from "./components/index.component";
import { MainContentComponent } from "./components/main-content.component";
import { ServiciosComponent } from "./components/servicios.component";
import { PlanesComponent } from "./components/planes.component";

@NgModule({
    declarations: [IndexComponent, MainContentComponent, ServiciosComponent, PlanesComponent],
    exports: [IndexComponent],
    imports: [CommonModule]
})
export class HomeModule {}
