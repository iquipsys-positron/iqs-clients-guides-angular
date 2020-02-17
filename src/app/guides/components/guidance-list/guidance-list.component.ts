import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { findIndex } from 'lodash';
import { PipMediaService } from 'pip-webui2-layouts';

import { Guidance, PipUpdateState } from '../../models/guidance.data';

@Component({
    selector: 'pip-guidance-list',
    templateUrl: 'guidance-list.component.html',
    styleUrls: ['./guidance-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipGuidanceListComponent implements OnInit {

    @Input() loading = false;
    @Input() state: string = null;
    @Input() guidances: Guidance[];
    @Input() selectId: string;
    @Input() emptyStateActions: any;


    @Input() newGuidanceText = 'New Guide';
    @Input() newGuidanceSubText = 'Application Name';
    @Input() progressImageUrl = './assets/progress.svg';
    @Input() emptyImageUrl = './assets/empty.svg';
    @Input() progressText = 'Loading guidances';
    @Input() emptySubText = '';
    @Input() emptyText = 'Guidances not found';
    @Input() emptyListUrl = './assets/menu-empty.svg';

    @Output() selectChange = new EventEmitter();
    @Output() add = new EventEmitter();

    public GuideColor = '#024184';

    public constructor(public media: PipMediaService) {
    }

    public ngOnInit() {

    }

    public onSelect(event) {
        if (event) {
            this.selectChange.emit(this.guidances[event.index].id);
        }
    }

    public select(id: string): void {
        if (this.state === PipUpdateState.Edit) this.selectChange.emit(id);
    }


    public addGuidance() {
        this.add.emit();
    }

    public get index(): number {
        return findIndex(this.guidances, {id: this.selectId});
    }
}
