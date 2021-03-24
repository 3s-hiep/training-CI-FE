import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { DialogData } from "./dialog.model";
@Component({
  selector: "cie-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DiaLogComponent {
  constructor(public dialogRef: MatDialogRef<DiaLogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCancel() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
}
