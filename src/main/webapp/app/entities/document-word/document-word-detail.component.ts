import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDocumentWord } from 'app/shared/model/document-word.model';

@Component({
    selector: 'jhi-document-word-detail',
    templateUrl: './document-word-detail.component.html'
})
export class DocumentWordDetailComponent implements OnInit {
    documentWord: IDocumentWord;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ documentWord }) => {
            this.documentWord = documentWord;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.downloadFile(contentType, field, 'test.docx');
    }
    previousState() {
        window.history.back();
    }
}
