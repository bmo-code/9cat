import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Profil } from './profil.model';
import { ProfilPopupService } from './profil-popup.service';
import { ProfilService } from './profil.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-profil-dialog',
    templateUrl: './profil-dialog.component.html'
})
export class ProfilDialogComponent implements OnInit {

    profil: Profil;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private profilService: ProfilService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.profil.id !== undefined) {
            this.subscribeToSaveResponse(
                this.profilService.update(this.profil));
        } else {
            this.subscribeToSaveResponse(
                this.profilService.create(this.profil));
        }
    }

    private subscribeToSaveResponse(result: Observable<Profil>) {
        result.subscribe((res: Profil) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Profil) {
        this.eventManager.broadcast({ name: 'profilListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-profil-popup',
    template: ''
})
export class ProfilPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private profilPopupService: ProfilPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.profilPopupService
                    .open(ProfilDialogComponent as Component, params['id']);
            } else {
                this.profilPopupService
                    .open(ProfilDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
