import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GuidePage } from '../../models/guidance.data';

@Component({
  styleUrls: ['guidance-delete-dialog.scss'],
  selector: 'pip-guidance-delete-dialog',
  templateUrl: 'guidance-delete-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class GuidanceDeleteDialog {

  slides: GuidePage[] = [];
  ln = 'en';
  url: string;
  constructor(
    public dialogRef: MatDialogRef<GuidanceDeleteDialog>,
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
