import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProfileComponent } from './profile.component';
import { ProfileDetailComponent } from './profile-detail.component';
import { ProfilePopupComponent } from './profile-dialog.component';
import { ProfileDeletePopupComponent } from './profile-delete-dialog.component';

export const profileRoute: Routes = [
    {
        path: 'profile',
        component: ProfileComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Profiles'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'profile/:id',
        component: ProfileDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Profiles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const profilePopupRoute: Routes = [
    {
        path: 'profile-new',
        component: ProfilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Profiles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'profile/:id/edit',
        component: ProfilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Profiles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'profile/:id/delete',
        component: ProfileDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Profiles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
