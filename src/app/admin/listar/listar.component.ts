import { Component, OnInit } from "@angular/core";
import { HttpServiceService } from "../../services/http-service.service";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
    selector: "admin-listar",
    templateUrl: "./listar.component.html",
    styleUrls: ["./listar.component.scss"]
})
export class ListarComponent implements OnInit {
    revisiones: any[] = [];
    isVisible = false;

    constructor(public httpServiceService: HttpServiceService, private modalService: NzModalService) {}

    ngOnInit(): void {
        const filtro = { where: { state: "pending" }, include: [{ relation: "pet" }] };
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
                        error: err => reject(false)
                    });
                }).catch(() => console.error("Error al momneto de cerrar el modal"))
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
}
