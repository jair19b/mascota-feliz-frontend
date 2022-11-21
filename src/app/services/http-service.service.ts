import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class HttpServiceService {
    url = "http://localhost:3000/";

    constructor(private http: HttpClient) {}

    obtenerDatos(url: string, filtro?: string, tipoFiltro: string = "documento"): Observable<any> {
        let filtroReal = null;
        if (filtro) {
            const filtroNombre = { where: { nombre: { like: filtro, options: "i" } } };
            const filtroDocumento = { where: { documento: { like: filtro, options: "i" } } };
            const filtroPlaca = { where: { placa: { like: filtro, options: "i" } } };
            if (tipoFiltro == "documento") {
                filtroReal = filtroDocumento;
            } else if (tipoFiltro == "placa") {
                filtroReal = filtroPlaca;
            } else if (tipoFiltro == "nombre") {
                filtroReal = filtroNombre;
            } else {
                filtroReal = filtroDocumento;
            }
            const parametros = new HttpParams().append("filter", JSON.stringify(filtroReal));
            const opcionesHttp = { params: parametros };
            return this.http.get(url, opcionesHttp);
        } else {
            return this.http.get(url);
        }
    }

    modificarDatosFilter(url: string, data: any, filtro: any): Observable<any> {
        const parametros = new HttpParams().append("filter", JSON.stringify(filtro));
        const opcionesHttp = { params: parametros, headers: new HttpHeaders({ "Content-type": "application/json;charset=utf-8" }) };
        const convertirJson = JSON.stringify(data);
        return this.http.patch(url, convertirJson, opcionesHttp);
    }

    obetenerDatosFilter(path: string, filtro: any): Observable<any> {
        const parametros = new HttpParams().append("filter", JSON.stringify(filtro));
        const opcionesHttp = { params: parametros };
        return this.http.get(this.url + path, opcionesHttp);
    }

    postDatos(path: string, datos: any): Observable<any> {
        const opcionesHttp = { headers: new HttpHeaders({ "Content-type": "application/json;charset=utf-8" }) };
        const convertirJson = JSON.stringify(datos);
        return this.http.post(this.url + path, convertirJson, opcionesHttp);
    }

    actualizarDatos(url: string, datos: any, filtro?: string, tipoFiltro?: string): Observable<any> {
        let filtroReal = null;
        if (filtro) {
            const filtroNombre = { where: { nombre: { like: filtro, options: "i" } } };
            const filtroDocumento = { where: { documento: { like: filtro, options: "i" } } };
            const filtroPlaca = { where: { placa: { like: filtro, options: "i" } } };
            if (tipoFiltro == "documento") {
                filtroReal = filtroDocumento;
            } else if (tipoFiltro == "placa") {
                filtroReal = filtroPlaca;
            } else if (tipoFiltro == "nombre") {
                filtroReal = filtroNombre;
            } else {
                filtroReal = filtroDocumento;
            }
            const parametros = new HttpParams().append("filter", JSON.stringify(filtroReal));
            const opcionesHttp = { params: parametros, headers: new HttpHeaders({ "Content-type": "application/json;charset=utf-8" }) };
            const convertirJson = JSON.stringify(datos);
            return this.http.put(url, convertirJson, opcionesHttp);
        } else {
            const convertirJson = JSON.stringify(datos);
            return this.http.put(url, convertirJson);
        }
    }

    eliminarDatos(url: string): Observable<any> {
        return this.http.delete(url);
    }
}
