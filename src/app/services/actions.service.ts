import { Injectable } from "@angular/core";
import { NzModalService } from "ng-zorro-antd/modal";
import { HttpServiceService } from "./http-service.service";

@Injectable({ providedIn: "root" })
export class ActionService {
    constructor(public httpServiceService: HttpServiceService, private modalService: NzModalService) {}

    deleteConfirm(path: string, title: string, message: string): void {
        this.modalService.confirm({
            nzTitle: title,
            nzContent: message,
            nzOkText: "Eliminar",
            nzCancelText: "Cancelar",
            nzOkDanger: true,
            nzOnOk: () =>
                new Promise((resolve, reject) => {
                    this.httpServiceService.eliminarDatos(path).subscribe({
                        next: res => {
                            this.modalService.success({
                                nzTitle: "Hecho",
                                nzContent: "Operación realizada con éxito"
                            });
                            resolve(true);
                        },
                        error: err => reject(false)
                    });
                })
        });
    }
}
