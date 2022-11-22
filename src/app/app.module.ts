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
import { HomeModule } from "./home/home.module";
import { AdminModule } from "./admin/admin.module";
import { ClientModule } from "./client/client.module";
import { LayoutModule } from "./layout/layout.module";
import { AuthModule } from "./auth/auth.module";

registerLocaleData(es);

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,

        HomeModule,
        AdminModule,
        ClientModule,
        LayoutModule,
        AuthModule
    ],
    providers: [{ provide: NZ_I18N, useValue: es_ES }],
    bootstrap: [AppComponent]
})
export class AppModule {}
