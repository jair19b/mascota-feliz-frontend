import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class HttpServiceService {
    private url = "https://mascota-feliz-backend-production.up.railway.app/";

    constructor(private http: HttpClient) {}

    modificarDatosFilter(path: string, data: any, filtro: any): Observable<any> {
        let token = localStorage.getItem("token") || "";
        const _headers = new HttpHeaders({ "Content-type": "application/json;charset=utf-8", authorization: `bearer ${token}` });
        const parametros = new HttpParams().append("filter", JSON.stringify(filtro));
        const opcionesHttp = { params: parametros, headers: _headers };
        const convertirJson = JSON.stringify(data);
        return this.http.patch(this.url + path, convertirJson, opcionesHttp);
    }

    obetenerDatosFilter(path: string, filtro: any): Observable<any> {
        let token = localStorage.getItem("token") || "";
        const _headers = new HttpHeaders({ "Content-type": "application/json;charset=utf-8", authorization: `bearer ${token}` });
        const parametros = new HttpParams().append("filter", JSON.stringify(filtro));
        const opcionesHttp = { params: parametros, headers: _headers };
        return this.http.get(this.url + path, opcionesHttp);
    }

    postDatos(path: string, datos: any): Observable<any> {
        let token = localStorage.getItem("token") || "";
        const headers = new HttpHeaders({ "Content-type": "application/json;charset=utf-8", authorization: `bearer ${token}` });
        const opcionesHttp = { headers: headers };
        const convertirJson = JSON.stringify(datos);
        return this.http.post(this.url + path, convertirJson, opcionesHttp);
    }

    eliminarDatos(path: string): Observable<any> {
        let token = localStorage.getItem("token") || "";
        const _headers = new HttpHeaders({ "Content-type": "application/json;charset=utf-8", authorization: `bearer ${token}` });
        const opcionesHttp = { headers: _headers };
        return this.http.delete(this.url + path, opcionesHttp);
    }

    modificarDatos(path: string, data: any): Observable<any> {
        let token = localStorage.getItem("token") || "";
        const _headers = new HttpHeaders({ "Content-type": "application/json;charset=utf-8", authorization: `bearer ${token}` });
        const opcionesHttp = { headers: _headers };
        const convertirJson = JSON.stringify(data);
        return this.http.patch(this.url + path, convertirJson, opcionesHttp);
    }
}
