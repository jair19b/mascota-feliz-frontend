import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { AdminModule } from "../admin/admin.module";

@NgModule({
    declarations: [HeaderComponent, FooterComponent, LayoutComponent],
    exports: [HeaderComponent, FooterComponent, LayoutComponent],
    imports: [RouterModule, CommonModule, AdminModule]
})
export class SharedModule {}
