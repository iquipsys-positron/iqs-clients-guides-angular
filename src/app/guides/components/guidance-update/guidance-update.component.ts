import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { cloneDeep, each, findIndex, isEqual } from 'lodash';
import { Application } from 'iqs-libs-clientshell2-angular';
import { Guidance, GuideStatus, GuidePage, GuideType, GuideKeyItem } from '../../models/guidance.data';

@Component({
    selector: 'pip-guidance-update',
    templateUrl: 'guidance-update.component.html',
    styleUrls: ['./guidance-update.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipGuidanceUpdateComponent implements OnInit, OnChanges {
    // Enter, comma
    public separatorKeysCodes = [ENTER, COMMA];
    public selectable = true;
    public removable = true;
    public addOnBlur = true;


    public updateItem: Guidance = new Guidance();
    public guideType: GuideKeyItem;
    public isChange = false;


    @Input() types: GuideKeyItem[] = [
        { id: GuideType.Introduction, title: 'GUIDANCE_TYPE_INTRODUCTION' },
        { id: GuideType.NewRelease, title: 'GUIDANCE_TYPE_NEW_RELEASE' }
    ];
    @Input() statuses: GuideKeyItem[];
    @Input() colors: string[] = [
        '#ef534f', '#ab47bc', '#7e57c2', '#5b6bc0', '#039be5',
        '#02bcd4', '#009688', '#4baf50', '#8bc34a', '#795548', '#607d8b'
    ];
    @Input() applications: Application[] = [];
    @Input() languages: string[] = [];


    @Input() url: string;
    @Input() ln = 'en';
    @Input() loading = false;
    @Input() error: any = null;
    @Input() guidance: Guidance;

    @Input() addPageText = 'Add new page';
    @Input() reviewText = 'Review';
    @Input() saveText = 'Save';
    @Input() cancelText = 'Cancel';
    @Input() deleteText = 'Delete';

    @Input() deletePageTooltip = 'Delete page';
    @Input() upPageTooltip = 'Up page';
    @Input() downPageTooltip = 'Down page';
    @Input() copyPageTooltip = 'Copy page';

    @Input() guideErrorNameRequired = 'Name is required';
    @Input() guideErrorApplicationRequired = 'Application is required';

    @Input() nameText = 'Name';
    @Input() appText = 'Application name';
    @Input() versionMinText = 'Min version';
    @Input() versionMaxText = 'Max version';
    @Input() tagText = 'New tag';
    @Input() statusText = 'Status';
    @Input() pageText = 'Page';
    @Input() titleText = 'Title';
    @Input() textText = 'Content';

    @Output() cancel = new EventEmitter();
    @Output() update = new EventEmitter();
    @Output() delete = new EventEmitter();
    @Output() review = new EventEmitter();
    @Output() create = new EventEmitter();
    @Output() change = new EventEmitter();
    @Output() changeLang = new EventEmitter();

    public constructor() {

    }

    private initStatuses() {
        if (!this.statuses) {
            this.statuses = [
                { title: 'GUIDANCE_STATUS_NEW', id: GuideStatus.New },
                { title: 'GUIDANCE_STATUS_WRITING', id: GuideStatus.Writing },
                { title: 'GUIDANCE_STATUS_TRANSLATING', id: GuideStatus.Translating },
                { title: 'GUIDANCE_STATUS_VERIFYING', id: GuideStatus.Verifying },
                { title: 'GUIDANCE_STATUS_COMPLETED', id: GuideStatus.Completed }
            ];
        }
    }

    public ngOnInit() {
        this.initStatuses();
    }

    public ngOnChanges(change: SimpleChanges) {
        if (change.guidance && !isEqual(change.guidance.currentValue, change.guidance.previousValue)) {
            this.updateItem = cloneDeep(change.guidance.currentValue);

            if (!this.updateItem) {
                this.updateItem = new Guidance();
            }
            if (!this.updateItem.type) {
                this.guideType = this.types[0];
                this.updateItem.type = this.guideType.id;
            } else {
                let index = findIndex(this.types, (item: GuideKeyItem) => {
                    return item.id === this.updateItem.type;
                });

                if (index === -1) {
                    index = 0;
                }
                this.guideType = this.types[index];
            }

            if (!this.updateItem.status) {
                this.updateItem.status = this.statuses && this.statuses[0] ? this.statuses[0].id : null;
            }

            each(this.updateItem.pages, (p: GuidePage) => {
                if (!p.title) {
                    p.title = {};
                }
                if (!p.content) {
                    p.content = {};
                }
            });
            this.isChange = !this.updateItem.id;
        }
    }

    public addTag(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our tag
        if ((value || '').trim()) {
            if (!this.updateItem.tags) {
                this.updateItem.tags = [];
            }
            this.updateItem.tags.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
        this.onChange();
    }

    public removeTag(tag: any): void {
        const index = this.updateItem.tags.indexOf(tag);

        if (index >= 0) {
            this.updateItem.tags.splice(index, 1);
            this.onChange();
        }
    }

    public changeLn(ln: string): void {
        this.ln = ln;
        this.changeLang.emit(this.ln);
    }

    public changeType(type: GuideKeyItem): void {
        this.guideType = type;
        this.updateItem.type = this.guideType.id;
        this.onChange();
    }

    public changeStatus(st) {
        this.updateItem.status = st;
        this.onChange();
    }

    public onReview() {
        console.log('review', this.updateItem);
        this.review.emit({
            guidance: this.updateItem,
            ln: this.ln
        });
    }

    public addPage() {
        const newPage: GuidePage = new GuidePage();
        newPage.title = {};

        newPage.content = {};
        this.updateItem.pages.push(newPage);
        this.onChange();
    }

    public onImageLoad($event, index: string) {
        this.updateItem.pages[index].dataPic = $event;
        if (this.updateItem.pages[index].pic_url) {
            delete this.updateItem.pages[index].pic_url;
        }
        this.onChange();
    }

    public onImageDelete($event, index: string) {
        this.updateItem.pages[index].dataPic = null;
        this.updateItem.pages[index].pic_url = null;
        this.updateItem.pages[index].pic_id = null;
        this.onChange();
    }

    public colorChanged($event, index: string) {
        if (this.updateItem.pages[index].color !== $event) {
            this.onChange();
        }
        this.updateItem.pages[index].color = $event;
    }

    public src(pic_id: string): string {
        if (this.url && pic_id) {
            return this.url + pic_id;
        }
        return null;
    }

    public copyPage(index: number) {
        if (this.updateItem.pages && this.updateItem.pages.length > index) {
            const page = cloneDeep(this.updateItem.pages[index]);
            this.updateItem.pages.splice(index + 1, 0, page);
            this.onChange();
        }
    }

    public moveUp(index: number) {
        if (this.updateItem.pages && index > 0) {
            const tmp = this.updateItem.pages[index - 1];
            this.updateItem.pages[index - 1] = this.updateItem.pages[index];
            this.updateItem.pages[index] = tmp;
            this.onChange();
        }
    }

    public moveDown(index: number) {
        if (this.updateItem.pages && this.updateItem.pages.length > index + 1) {
            const tmp = this.updateItem.pages[index];
            this.updateItem.pages[index] = this.updateItem.pages[index + 1];
            this.updateItem.pages[index + 1] = tmp;
            this.onChange();
        }
    }

    public deletePage(index: number) {
        if (this.updateItem.pages && this.updateItem.pages.length > index) {
            this.updateItem.pages.splice(index, 1);
            this.onChange();
        }
    }

    public onChange() {
        this.isChange = true;
        if (this.change) { this.change.emit(); }
    }

    public deleteSubmit(): void {
        this.delete.emit(this.guidance.id);
    }

    public onCancel(): void {
        this.cancel.emit();
        this.updateItem = cloneDeep(this.guidance);
        this.isChange = !this.updateItem.id;
    }

    public saveSubmit(): void {
        const guidance = cloneDeep(this.updateItem);
        if (this.updateItem.id) {
            this.update.emit(guidance);
        } else {
            this.create.emit(guidance);
        }
    }

}
