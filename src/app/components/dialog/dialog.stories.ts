import { Component } from "@angular/core";
import { storiesOf, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonModule } from "../button/button.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DiaLogComponent } from "./dialog.component";
import { DiaLogModule } from "./dialog.module";
import { action } from "@storybook/addon-actions";
import { CreateUserDetailModule } from "../create-user/create-user-detail/create-user-detail.module";
@Component({
  selector: "cie-dialog",
  template: `
    <div fxLayout="row" fxLayoutGap="25px" class="top-page-task-list" fxFlex="100%">
      <cie-button fxLayout="column" ngClass="primary" fxFlex="10%" (click)="click1($event)">Default</cie-button>
      <cie-button fxLayout="column" ngClass="primary" fxFlex="10%" (click)="click2($event)">Not Cancel</cie-button>
      <cie-button fxLayout="column" ngClass="primary" fxFlex="10%" (click)="click3($event)">Not Ok</cie-button>
      <cie-button fxLayout="column" ngClass="primary" fxFlex="10%" (click)="click4($event)">Delete User</cie-button>
      <cie-button fxLayout="column" ngClass="primary" fxFlex="10%" (click)="click5($event)">Undelete User</cie-button>
    </div>
  `,
})
export class DialogsComponent {
  constructor(public dialog: MatDialog) {}
  click1() {
    const dialogRef = this.dialog.open(DiaLogComponent, {
      data: {
        text: "Are you sure to delete this task?",
        buttonLabels: {
          cancel: "Cancel",
          ok: "OK",
        },
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        action("OK");
      } else {
        action("Cancel");
      }
      return;
    });
  }
  click2() {
    const dialogRef = this.dialog.open(DiaLogComponent, {
      data: {
        text: "Not cancel button alert component Dialog",
        buttonLabels: {
          cancel: "Cancel",
          ok: "OK",
        },
        notCancelButton: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        action("OK");
      } else {
        action("Cancel");
      }
      return;
    });
  }
  click3() {
    const dialogRef = this.dialog.open(DiaLogComponent, {
      data: {
        text: "Not OK button alert component Dialog",
        buttonLabels: {
          cancel: "Cancel",
          ok: "OK",
        },
        notOkButton: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        action("OK");
      } else {
        action("Cancel");
      }
      return;
    });
  }
  click4() {
    const dialogRef = this.dialog.open(DiaLogComponent, {
      data: {
        title: "Confirm Delete",
        text: "Are you sure you want to delete?",
        textConfirm: "You can cancel the deletion until it is distributed.",
        buttonLabels: {
          cancel: "Cancel",
          ok: "Delete",
        },
      },
      autoFocus: false,
      panelClass: "custom-dialog",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        action("Delete");
      } else {
        action("Cancel");
      }
      return;
    });
  }
  click5() {
    const dialogRef = this.dialog.open(DiaLogComponent, {
      data: {
        title: "Confirm Undelete",
        text: "Are you sure you want to undelete?",
        textConfirm: "The deletion will be canceled.",
        buttonLabels: {
          cancel: "Cancel",
          ok: "Undelete",
        },
      },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        action("Undelete");
      } else {
        action("Cancel");
      }
      return;
    });
  }
}

storiesOf("Components | Molecules/Dialog", module)
  .addDecorator(
    moduleMetadata({
      imports: [
        CommonModule,
        MatDialogModule,
        DiaLogModule,
        FlexLayoutModule,
        ButtonModule,
        TranslateModule.forRoot(),
        CreateUserDetailModule,
      ],
      declarations: [DialogsComponent],
    }),
  )
  .add("usecase", () => ({
    template: `<cie-dialog></cie-dialog>`,
  }));
