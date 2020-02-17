import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';
import {
    EntryService,
    PipEntryConfig,
    PipEntryConfigService
} from '@iquipsys/pip-suite2-entry';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
    PipSidenavModule,
    PipMediaModule
} from 'pip-webui2-layouts';

import { GuidesContainerComponent } from './guides-container.component';
import { GuidesContainerModule } from './guides-container.module';
import { GuidanceDataService } from '../../services/guidance.data.service';

describe('a guidance-example component', () => {
    let component: GuidesContainerComponent;
    let fixture: ComponentFixture<GuidesContainerComponent>;
    const mockRouter = {
        navigate: jasmine.createSpy('navigate')
    };
    const mockActivatedRoute = {
        snapshot: {
            queryParams: {
                state: null,
                single: false
            }
        }
    };
    const entryConfig: PipEntryConfig = <PipEntryConfig>{
        autorizeState: 'guidance',
        url: 'http://api.positron.stage.iquipsys.net:30018'
    };
    const configService = new PipEntryConfigService(entryConfig);

    // register all needed dependencies
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(),
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
                LocalStorageModule.withConfig({
                    prefix: 'my-app',
                    storageType: 'localStorage'
                }),
                PipSidenavModule.forRoot(),
                PipMediaModule.forRoot(),

                GuidesContainerModule
            ],
            providers: [
                EntryService,
                {
                    provide: PipEntryConfigService,
                    useValue: configService
                },
                { provide: Router, useValue: mockRouter },
                {
                    provide: ActivatedRoute,
                    useValue: mockActivatedRoute
                },
                GuidanceDataService
            ]
        });
        fixture = TestBed.createComponent(GuidesContainerComponent);
        component = fixture.componentInstance;
    });

    // instantiation through framework injection
    // beforeEach(inject([GuidanceExampleComponent], (ExampleComponent) => {
    //     component = ExampleComponent;
    // }));

    it('should have an instance', () => {
        expect(component).toBeDefined();
    });
});
