import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IndexComponent } from "./components/index.component";
import { MainContentComponent } from "./components/main-content.component";

@NgModule({
    declarations: [IndexComponent, MainContentComponent],
    exports: [IndexComponent],
    imports: [CommonModule]
})
export class HomeModule {}
