import { Component, OnInit } from "@angular/core";
import { HttpServiceService } from "../../services/http-service.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { AuthService } from "./../../services/auth.service";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { ValidatorService } from "./../../services/validator.service";
const moment = require("moment");

@Component({
    selector: "admin-listar",
    templateUrl: "./listar.component.html",
    styleUrls: ["./listar.component.scss"]
})
export class ListarComponent implements OnInit {
    revisiones: any[] = [];
    isVisible = false;
    private _editing: any;

    formEdit: FormGroup = this.fb.group({
        state: [""],
        details: ["", this.vs.validRequired],
        updatedAt: [moment().format("YYYY-MM-DDTHH:mm:ss.SSS")],
        advisorId: [this.user.uid]
    });

    get user() {
        return this.authService.user;
    }

    constructor(
        public fb: FormBuilder,
        public vs: ValidatorService,
        public http: HttpServiceService,
        private modalService: NzModalService,
        private authService: AuthService
    ) {
        moment.locale("es");
    }

    ngOnInit(): void {
        const filtro = { include: [{ relation: "pet" }, { relation: "owner" }] };
        this.http.obetenerDatosFilter("requests", filtro).subscribe({
            next: response => {
                console.log(response);
                this.revisiones = response;
            },
            error: error => console.log(error)
        });
    }

    updateLocalData(newData: any) {
        const localData = [...this.revisiones];
        for (let i = 0; i < localData.length; i++) {
            if (localData[i].id == newData.id) {
                localData.splice(i, 1, newData);
                break;
            }
        }
        return localData;
    }

    deleteItemLocalData(oldData: any) {
        const localData = [...this.revisiones];
        for (let i = 0; i < localData.length; i++) {
            if (localData[i].id == oldData.id) {
                localData.splice(i, 1);
                break;
            }
        }
        return localData;
    }

    showDeleteModal(data: any): void {
        this.modalService.confirm({
            nzTitle: "Eliminar Solicitud de revisión",
            nzContent: "Estas seguro que deseas eliminar esta revisión",
            nzOkText: "Continuar",
            nzCancelText: "Cancelar",
            nzOkDanger: true,
            nzOnOk: () =>
                new Promise((resolve, reject) => {
                    this.http.eliminarDatos(`requests/${data.id}`).subscribe({
                        next: res => {
                            this.modalService.success({
                                nzTitle: "Hecho",
                                nzContent: "La revision ha sido eliminada corectamente"
                            });
                            this.revisiones = this.deleteItemLocalData(data);
                            resolve(true);
                        },
                        error: err => reject(err)
                    });
                }).catch(err =>
                    this.modalService.error({
                        nzTitle: "Error",
                        nzContent: err.error.error.message
                    })
                )
        });
    }

    showModal(solicitud: any, action: boolean): void {
        this.isVisible = true;
        this._editing = solicitud;
        action ? this.formEdit.get("state")?.setValue("Aceptado") : this.formEdit.get("state")?.setValue("Rechazado");
    }

    handleOk(): void {
        this.adAction(this._editing);
    }

    handleCancel(): void {
        this.isVisible = false;
    }

    formatDate(date: string): string {
        return moment(date).fromNow();
    }

    campoEsValido(campo: string) {
        return this.formEdit.controls[campo]?.errors && this.formEdit.controls[campo].touched;
    }

    getError(campo: string): string {
        const error = this.formEdit.controls[campo].errors;
        return error ? error["message"] : null;
    }

    adAction(solicitud: any): void {
        const newD = this.formEdit.getRawValue();
        this.http.modificarDatos(`requests/state/${solicitud.id}`, newD).subscribe({
            next: response => {
                this.revisiones = this.updateLocalData({ ...solicitud, ...newD });
                this.isVisible = false;
                this.modalService.success({
                    nzTitle: "Exito",
                    nzContent: "Operación realizada con exito"
                });
            },
            error: err => {
                this.isVisible = false;
                this.modalService.error({
                    nzTitle: "Error",
                    nzContent: err.error.error.message
                });
            }
        });
    }
}
