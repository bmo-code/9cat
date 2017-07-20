import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import {PostService} from '../entities/post/post.service';
import {Post} from '../entities/post/post.model';
import {ResponseWrapper} from '../shared/model/response-wrapper.model';
import {ITEMS_PER_PAGE} from '../shared/constants/pagination.constants';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    posts: Post[];
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;
    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private postService: PostService,
        private parseLinks: JhiParseLinks,
        private alertService: JhiAlertService
    ) {
        this.posts = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();

        this.loadAll();
    }

    upvote(id: number) {
        this.postService.upvote(this.posts[id].id).subscribe(
            (res: any) => {
                return this.posts[id].score = res.json();
            }
        );
    }

    downvote(id: number) {
        this.postService.downvote(this.posts[id].id).subscribe(
            (res: any) => {
                return this.posts[id].score = res.json();
            }
        );
    }

    loadAll() {
        this.postService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    reset() {
        this.page = 0;
        this.posts = [];
        this.loadAll();
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.posts.push(data[i]);
        }
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
