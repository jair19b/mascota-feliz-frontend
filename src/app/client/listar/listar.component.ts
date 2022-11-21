import { Component, OnInit } from "@angular/core";
import { HttpServiceService } from "./../../services/http-service.service";

@Component({
    selector: "app-listar",
    templateUrl: "./listar.component.html",
    styleUrls: ["./listar.component.scss"]
})
export class ListarComponent implements OnInit {
    revisiones: any[] = [];

    constructor(public httpServiceService: HttpServiceService) {}

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
}
