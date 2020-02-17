import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GuidePage } from '../../models/guidance.data';

@Component({
  styleUrls: ['guidance-review-dialog.scss'],
  selector: 'pip-guidance-review-dialog',
  templateUrl: 'guidance-review-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class GuidanceReviewDialog {

  slides: GuidePage[] = [];
  ln = 'en';
  url: string;
  constructor(
    public dialogRef: MatDialogRef<GuidanceReviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.slides = data.slides;
    this.ln = data.ln;
    this.url = data.url;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
