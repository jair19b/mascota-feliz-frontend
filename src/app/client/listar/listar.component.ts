import { Component, OnInit } from "@angular/core";
import { HttpServiceService } from "./../../services/http-service.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { AuthService } from "./../../services/auth.service";
const moment = require("moment");

@Component({
    selector: "app-listar",
    templateUrl: "./listar.component.html",
    styleUrls: ["./listar.component.scss"]
})
export class ListarComponent implements OnInit {
    revisiones: any[] = [];
    isVisible = false;

    get user() {
        return this.authService.user;
    }

    constructor(public httpServiceService: HttpServiceService, private modalService: NzModalService, private authService: AuthService) {}

    ngOnInit(): void {
        const filtro = { where: { ownerId: this.user.uid }, include: [{ relation: "pet" }] };
        this.httpServiceService.obetenerDatosFilter("requests", filtro).subscribe({
            next: response => {
                console.log(response);
                this.revisiones = response;
            },
            error: error => console.log(error)
        });
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
                    this.httpServiceService.eliminarDatos(`requests/${data.id}`).subscribe({
                        next: res => {
                            this.modalService.success({
                                nzTitle: "Hecho",
                                nzContent: "La revision ha sido eliminada corectamente"
                            });
                            const copia = JSON.parse(JSON.stringify(this.revisiones));
                            for (let i in copia) {
                                if (copia[i].id == data.id) {
                                    copia.splice(i, 1);
                                    break;
                                }
                            }
                            this.revisiones = copia;
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

    showModal(): void {
        this.isVisible = true;
    }

    handleOk(): void {
        this.isVisible = false;
    }

    handleCancel(): void {
        this.isVisible = false;
    }

    formatDate(date: string) {
        return moment(date).startOf("day").fromNow();
    }
}
