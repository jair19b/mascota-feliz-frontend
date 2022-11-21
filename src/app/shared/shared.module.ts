import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { AdminModule } from "../admin/admin.module";

@NgModule({
    declarations: [HeaderComponent, FooterComponent, LayoutComponent, AdminLayoutComponent],
    exports: [HeaderComponent, FooterComponent, LayoutComponent, AdminLayoutComponent],
    imports: [RouterModule, CommonModule, AdminModule]
})
export class SharedModule {}
