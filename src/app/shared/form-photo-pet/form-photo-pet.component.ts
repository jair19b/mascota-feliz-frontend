import { Component, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpServiceService } from "./../../services/http-service.service";
import { UploadedFile } from "src/app/interfaces";
import { EventEmitter } from "@angular/core";

@Component({
    selector: "app-form-photo-pet",
    templateUrl: "./form-photo-pet.component.html",
    styleUrls: ["./form-photo-pet.component.scss"]
})
export class FormPhotoPetComponent implements OnInit {
    photoForm: FormGroup = this.fb.group({
        file: [""]
    });

    textButton = "Cargar Foto";
    visibleButton: boolean = true;

    @Input() errorM: any = null;
    @Output() imageFileName: EventEmitter<string> = new EventEmitter();

    constructor(public fb: FormBuilder, private httpService: HttpServiceService) {}

    ngOnInit(): void {}

    changeImage(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.photoForm.controls["file"].setValue(file);
        }
    }

    submitPhoto() {
        this.textButton = "Cargando...";
        this.visibleButton = false;
        const form = new FormData();
        form.append("file", this.photoForm.controls["file"].value);
        this.httpService.sendFiles(form).subscribe({
            next: (resp: UploadedFile) => {
                this.textButton = "Cargada";
                this.imageFileName.emit(resp.filename);
            },
            error: err => (this.errorM = err.error.error.message)
        });
    }
}
