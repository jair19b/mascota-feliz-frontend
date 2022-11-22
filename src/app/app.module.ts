import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NZ_I18N } from "ng-zorro-antd/i18n";
import { es_ES } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import es from "@angular/common/locales/es";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { HomeModule } from "./home/home.module";
import { DasboardRoutingModule } from "./dasboard/dasboard-routing.module";
import { AdminRoutingModule } from "./admin/admin-routing.module";
import { AdminLayoutComponent } from "./shared/admin-layout/admin-layout.component";
import { AdminModule } from "./admin/admin.module";

registerLocaleData(es);

@NgModule({
    declarations: [AppComponent, AdminLayoutComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        HomeModule,
        AdminRoutingModule,
        AdminModule
    ],
    providers: [{ provide: NZ_I18N, useValue: es_ES }],
    bootstrap: [AppComponent]
})
export class AppModule {}
