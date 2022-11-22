import { Component, OnInit } from "@angular/core";
import { HttpServiceService } from "../../services/http-service.service";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
    selector: "admin-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
    revisiones: any[] = [];
    isVisible = false;

    constructor(public httpServiceService: HttpServiceService, private modalService: NzModalService) {}

    ngOnInit(): void {
        // const filtro = { where: { state: "pending" }, include: [{ relation: "pet" }] };
        this.httpServiceService.obetenerDatosFilter("users", {}).subscribe({
            next: response => {
                console.log(response);
                this.revisiones = response;
            },
            error: error => console.log(error)
        });
    }

    showDeleteModal(data: any): void {
        this.modalService.confirm({
            nzTitle: "Eliminar",
            nzContent: "Estas seguro que deseas eliminar",
            nzOkText: "Continuar",
            nzCancelText: "Cancelar",
            nzOkDanger: true,
            nzOnOk: () =>
                new Promise((resolve, reject) => {
                    this.httpServiceService.eliminarDatos(`users/${data.id}`).subscribe({
                        next: res => {
                            this.modalService.success({
                                nzTitle: "Hecho",
                                nzContent: "El Usario ha sido eliminado"
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
