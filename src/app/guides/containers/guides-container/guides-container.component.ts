import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewContainerRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { each } from 'lodash';
import { Observable, BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PipMediaService, MediaMainChange, PipSidenavService } from 'pip-webui2-layouts';
import { PipNavService } from 'pip-webui2-nav';
import { Application, IqsSessionConfigService } from 'iqs-libs-clientshell2-angular';
import { Guidance, GuideStatus, GuidePage, PipUpdateState } from '../../models/guidance.data';
import { PipGuidanceService } from '../../services/guidance.service';
import { GuidanceTranslations } from './guidance.strings';
import { GuidanceReviewDialog } from '../../components/guidance-review-dialog/guidance-review-dialog';
import { GuidanceDeleteDialog } from '../../components/guidance-delete-dialog/guidance-delete-dialog';
import { IqsAskDialogComponent } from 'iqs-libs-clientshell2-angular';
import { PipGuidanceActionTypes } from '../../store/guidance.action';
import { filter, debounceTime } from 'rxjs/operators';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-guides-container',
    templateUrl: 'guides-container.component.html',
    styleUrls: ['guides-container.component.scss']
})

export class GuidesContainerComponent implements OnInit, OnDestroy {

    public guidances$: Observable<Guidance[]>;
    public applications$: Observable<Application[]>;
    public loading$: Observable<boolean>;
    public error$: Observable<any>;
    public updateState$: Observable<string>;
    public selectId$: Observable<string>;
    public selectGuidance$: Observable<Guidance>;

    public languages: string[] = ['en', 'ru'];
    public ln = 'en';

    public isSingle$: BehaviorSubject<boolean>;
    private _guidances: Guidance[];
    // public applicationsName: string[] = [];
    private _state: string;
    public isSingle: boolean;

    private _subscribeMedia: Subscription = new Subscription();

    public emptyGuidance = new Guidance();
    public emptyStateActions: any[];
    private isBackIcon = false;

    // todo
    public beforState: string;
    public currentState: string;

    constructor(
        private _viewContainerRef: ViewContainerRef,
        public dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private navService: PipNavService,
        private cd: ChangeDetectorRef,
        public media: PipMediaService,
        private router: Router,
        // private data: GuidanceDataService,
        private guidanceService: PipGuidanceService,
        private sessionConfig: IqsSessionConfigService,
        private translate: TranslateService,
        private sidenav: PipSidenavService,
        private ngZone: NgZone
    ) {

        this.sidenav.active = true;
        this.error$ = this.guidanceService.error$;
        this.loading$ = this.guidanceService.loading$;
        this.guidances$ = this.guidanceService.guidances$;
        this.applications$ = this.guidanceService.applications$;
        this.updateState$ = this.guidanceService.updateState$;
        this.selectId$ = this.guidanceService.selectId$;
        this.selectGuidance$ = this.guidanceService.selectGuidance$;

        this.translate.setTranslation('en', GuidanceTranslations.en, true);
        this.translate.setTranslation('ru', GuidanceTranslations.ru, true);

        this._subscribeMedia.add(combineLatest(
            this.guidanceService.selectGuidance$.pipe(filter(p => !!p)),
            this.guidanceService.updateState$,
            this.guidanceService.isSingle$,
        ).pipe(
            debounceTime(10)
        ).subscribe(([guidance, state, isSingle]) => {
            this.ngZone.run(() => this.router.navigate([], {
                queryParams: { guidance_id: guidance.id, state: state, single: isSingle },
                queryParamsHandling: 'merge'
            }));
        }));


        this.emptyGuidance.pages = [];
        this.emptyGuidance.status = GuideStatus.New;
        this.emptyGuidance.pages.push(new GuidePage());

        this.navService.showBreadcrumb({
            items: [
                { title: 'GUIDANCE_BREADCRUMB_TEXT' }
            ]
        });

        this.emptyStateActions = [
            { title: 'GUIDANCE.ADD.BUTTON.TEXT', action: () => { this.initAdd(); } }
        ];
    }

    public ngOnInit() {
        const isMobile = this.media.isMainActive('xs') || this.media.isMainActive('sm');
        const state = this.activatedRoute.snapshot.queryParams['state'];

        this.isSingle = !isMobile ? !!this.activatedRoute.snapshot.queryParams['single'] : false;
        this.isSingle$ = new BehaviorSubject(this.isSingle);
        this.isSingle$.subscribe(single => {
            this.isSingle = single;
            // this.router.navigate(['/guidance'], { queryParams: { single: true }, queryParamsHandling: 'merge' });
            this.changeNavWithState();
        });
        this.isSingle$.next((isMobile) && (state === PipUpdateState.Create || state === PipUpdateState.Edit) ? true : this.isSingle);

        this.guidances$.subscribe(guides => this._guidances = guides);
        this.updateState$.subscribe(st => {
            this._state = st;
            this.changeNavWithState();
        });

        this.guidanceService.guidance();

        this.guidanceService.getApplications();
        // this.applications$.subscribe(apps => {
        //     const collection: string[] = [];
        //     if (apps && apps.length > 0) {
        //         each(apps, (app: Application) => {
        //             if (app.name) {
        //                 collection.push(app.name['en']);
        //             }
        //         });
        //     }

        //     this.applicationsName = collection;
        // });

        this._subscribeMedia = this.media.asObservableMain().subscribe((change: MediaMainChange) => {
            if (!(change.aliases.includes('xs') || change.aliases.includes('sm'))) {
                this.isSingle$.next(false);
                if (this.isBackIcon) { this.restoreIcon(); }
            }

            if ((change.aliases.includes('xs') || change.aliases.includes('sm'))
                && (this._state === PipUpdateState.Create || this._state === PipUpdateState.Edit)) {
                this.isSingle$.next(true);
            }

            // this.router.navigate([], { queryParams: { single: this.isSingle }, queryParamsHandling: 'merge' });
            this.cd.detectChanges();
        });
    }

    public ngOnDestroy() {
        this._subscribeMedia.unsubscribe();
    }

    public changeLn(ln: string) {
        this.ln = ln;
    }

    public get state(): string {
        return this._state;
    }

    public openReview(review: any): void {
        if (!review || !review.guidance || !review.guidance.pages || review.guidance.pages.length === 0) {
            // todo show message
            return;
        }

        this.ln = review.ln || 'en';
        const params = {
            width: '80%',
            height: '100%',
            maxWidth: '80%',
            margin: '0 auto',
            panelClass: 'guidance-review-dialog',
            data: { slides: review.guidance.pages, ln: this.ln, url: this.url }
        };

        const dialogRef = this.dialog.open(GuidanceReviewDialog, params);
        dialogRef.afterClosed().subscribe(result => {

        });
    }

    public openDeleteConfirmationDialog(id: string): void {
        // const params = {
        //     width: '80%',
        //     height: '100%',
        //     maxWidth: '80%',
        //     margin: '0 auto',
        //     panelClass: 'guidance-delete-dialog'
        // };

        // const dialogRef = this.dialog.open(GuidanceDeleteDialog, params);
        // dialogRef.afterClosed().subscribe((accept: boolean) => {
        //     if (accept) {
        //         // DO SOMETHING
        //         this.delete(id);
        //     } else {
        //         // DO SOMETHING ELSE
        //     }
        // });

        this.dialog.open(IqsAskDialogComponent, {
            width: '450px',
            data: {
                title: 'GUIDANCE.DELETE.DIALOG.TITLE',
                content: [
                    this.translate.instant('GUIDANCE.DELETE.DIALOG.MESSAGE')
                ],
                actions: {
                    no: {
                        text: 'GUIDANCE.DELETE.DIALOG.BUTTON.CANCEL',
                        returnValue: false
                    },
                    yes: {
                        text: 'GUIDANCE.DELETE.DIALOG.BUTTON.OK',
                        returnValue: true,
                        color: 'warn'
                    }
                },
                initFocusActionKey: 'no'
            }
        }).afterClosed().subscribe((accept: boolean) => {
            if (accept) {
                // DO SOMETHING
                this.delete(id);
            } else {
                // DO SOMETHING ELSE
            }
        });
    }

    public select(id) {
        if (this._state === PipUpdateState.Create || this._state === PipUpdateState.Edit) {
            this.dialog.open(IqsAskDialogComponent, {
                width: '450px',
                data: {
                    title: 'GUIDANCE.EDIT.CANCEL.DIALOG.TITLE',
                    content: [
                        this.translate.instant('GUIDANCE.EDIT.CANCEL.DIALOG.MESSAGE')
                    ],
                    actions: {
                        no: {
                            text: 'GUIDANCE.EDIT.CANCEL.DIALOG.BUTTON.CANCEL',
                            returnValue: false
                        },
                        yes: {
                            text: 'GUIDANCE.EDIT.CANCEL.DIALOG.BUTTON.OK',
                            returnValue: true,
                            color: 'warn'
                        }
                    },
                    initFocusActionKey: 'no'
                }
            }).afterClosed().subscribe((accept: boolean) => {
                if (accept) {
                    // DO SOMETHING
                    this.cancel();
                    this.onSelectById(id);
                } else {
                    // DO SOMETHING ELSE
                }
            });
        } else {
            this.onSelectById(id);
        }
    }

    private onSelectById(id: string): void {
        this.guidanceService.guidanceSelect(id);
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(true);
            this.isBackIcon = true;
            this.navService.showNavIcon({
                icon: 'arrow_back',
                action: () => {
                    if (this._state === PipUpdateState.Create || this._state === PipUpdateState.Edit) {
                        this.select(null);
                    } else {
                        this.isSingle$.next(false);
                        this.restoreIcon();
                    }
                }
            });

        }
    }

    private restoreIcon() {
        this.isBackIcon = false;
        this.navService.showNavIcon({
            icon: 'menu',
            action: () => {
                this.sidenav.toggleOpened();
            }
        });
    }


    public initAdd() {
        this.guidanceService.guidanceChangeState(PipUpdateState.Create);
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(true);
            this.isBackIcon = true;
            this.navService.showNavIcon({
                icon: 'arrow_back',
                action: () => this.select(null)
            });

        }
    }

    public cancel() {
        this.guidanceService.guidanceChangeCancel(this._guidances);
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(false);
        }
        if (this.isBackIcon) {
            this.restoreIcon();
        }

    }

    public update(guidance: Guidance) {
        this.guidanceService.guidanceSaveImages(guidance, PipGuidanceActionTypes.GuidanceUpdate);
    }

    public create(guidance: Guidance) {
        this.guidanceService.guidanceSaveImages(guidance, PipGuidanceActionTypes.GuidanceCreate);
    }

    private delete(id: string) {
        this.guidanceService.guidanceDelete(id);
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(false);
        }
    }

    public change() {
        this.guidanceService.guidanceChangeState(PipUpdateState.Edit);
    }

    public changeNavWithState() {
        const isMobile = this.media.isMainActive('xs') || this.media.isMainActive('sm');
        if (!this.isSingle && this.isBackIcon) {
            this.restoreIcon();
        }
        if (!isMobile) {
            switch (this._state) {
                case PipUpdateState.Edit:
                    this.navService.showBreadcrumb({
                        items: [
                            {
                                title: 'GUIDANCE_BREADCRUMB_TEXT',
                                click: () => {
                                    this.cancel();
                                }
                            },
                            { title: 'GUIDANCE.EDIT' }
                        ]
                    });
                    return;
                case PipUpdateState.View:
                    this.navService.showBreadcrumb({
                        items: [
                            {
                                title: 'GUIDANCE_BREADCRUMB_TEXT',
                                click: () => {
                                    this.cancel();
                                }
                            },
                            { title: 'GUIDANCE.VIEW' }
                        ]
                    });
                    return;
                case PipUpdateState.Create:
                    this.navService.showBreadcrumb({
                        items: [
                            {
                                title: 'GUIDANCE_BREADCRUMB_TEXT',
                                click: () => {
                                    this.cancel();
                                }
                            },
                            { title: 'GUIDANCE.CREATE' }
                        ]
                    });
                    return;
                default:
                    this.navService.showBreadcrumb({
                        items: [
                            { title: 'GUIDANCE_BREADCRUMB_TEXT' }
                        ]
                    });
            }
        } else {
            if (this.isSingle && !this.isBackIcon) {
                this.isBackIcon = true;
                this.navService.showNavIcon({
                    icon: 'arrow_back',
                    action: () => {
                        if (this._state === PipUpdateState.Edit || this._state === PipUpdateState.Create) {
                            this.select(null);
                        } else {
                            this.cancel();
                        }
                    }
                });
            }

            switch (this._state) {
                case PipUpdateState.View:
                    if (!this.isSingle) {
                        this.navService.showBreadcrumb({
                            items: [
                                { title: 'GUIDANCE_BREADCRUMB_TEXT' }
                            ]
                        });
                        return;
                    }
                        this.navService.showBreadcrumb({
                            items: [
                                {
                                    title: 'GUIDANCE.DETAILS',
                                    click: () => {
                                        this.cancel();
                                    }
                                }
                            ]
                        });

                     return;
                case PipUpdateState.Edit:
                    this.navService.showBreadcrumb({
                        items: [
                            {
                                title: 'GUIDANCE.EDIT',
                                click: () => {
                                    this.cancel();
                                }
                            }
                        ]
                    });
                    return;
                case PipUpdateState.Create:
                    this.navService.showBreadcrumb({
                        items: [
                            {
                                title: 'GUIDANCE.CREATE',
                                click: () => {
                                    this.cancel();
                                }
                            }
                        ]
                    });
                    return;
                default:
                    this.navService.showBreadcrumb({
                        items: [
                            { title: 'GUIDANCE_BREADCRUMB_TEXT' }
                        ]
                    });
            }
        }

    }

    public get url(): string {
        return this.sessionConfig.serverUrl + '/api/v1/blobs/';
    }
}
