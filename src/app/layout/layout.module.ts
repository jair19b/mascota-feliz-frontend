import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DefaultComponent } from "./default/default.component";
import { AdminComponent } from "./admin/admin.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "../app-routing.module";
import { ClientModule } from "../client/client.module";
import { AdminModule } from "../admin/admin.module";

@NgModule({
    declarations: [DefaultComponent, AdminComponent, FooterComponent, HeaderComponent],
    imports: [CommonModule, AppRoutingModule, ClientModule, AdminModule],
    exports: [DefaultComponent, AdminComponent]
})
export class LayoutModule {}
