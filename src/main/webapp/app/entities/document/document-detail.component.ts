import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document/document.service';

@Component({
    selector: 'jhi-document-detail',
    templateUrl: './document-detail.component.html'
})
export class DocumentDetailComponent implements OnInit {
    document: IDocument;

    constructor(protected activatedRoute: ActivatedRoute, protected documentService: DocumentService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ document }) => {
            this.document = document;
            this.documentService.getWord(document.id).subscribe(value => {
                console.log(value);
            });
            /*   const byteCharacters = atob(document.base64);
               const byteNumbers = new Array(byteCharacters.length);
               for (let i = 0; i < byteCharacters.length; i++) {
                   byteNumbers[i] = byteCharacters.charCodeAt(i);
                   const byteArray = new Uint8Array(byteNumbers);
                   const blob = new Blob([byteArray], {type: 'application/octet-stream'});

               }*/
            /* const b64toBlob = async (b64Data, contentType = 'application/octet-stream') => {
                const url = `data:${contentType};base64,${b64Data}`;
                const response = await fetch(url);
                const blob = await response.blob();
                return blob;
            };
            const b = b64toBlob(document.base64);
            console.log(b);
            var url = window.URL.createObjectURL(b);
            var anchor = document.createElement("a");
            anchor.download = "myfile.docx";
            anchor.href = URL.createObjectURL(res.image);
            anchor.click();*/
        });
    }

    previousState() {
        window.history.back();
    }
}
