import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormCreateuserComponent } from "./form-createuser/form-createuser.component";
import { FormEditUserComponent } from "./form-edit-user/form-edit-user.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzModalModule } from "ng-zorro-antd/modal";

@NgModule({
    declarations: [FormCreateuserComponent, FormEditUserComponent],
    imports: [CommonModule, ReactiveFormsModule, NzModalModule, NzAlertModule],
    exports: [FormCreateuserComponent, FormEditUserComponent]
})
export class SharedModule {}
