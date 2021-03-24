import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";

import { DiaLogComponent } from "./dialog.component";
import { DialogData } from "./dialog.model";

@Injectable({ providedIn: "root" })
export class DialogService {
  constructor(public dialog: MatDialog) {}

  alert(data: DialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(DiaLogComponent, { data });

    return dialogRef.afterClosed();
  }
}
