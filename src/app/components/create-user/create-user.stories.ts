import { Component } from "@angular/core";
import { storiesOf, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonModule } from "../button/button.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { action } from "@storybook/addon-actions";
import { FormsModule, Validators } from "@angular/forms";
import { LabelledValue } from "../index.i";
import { CreateUserDetailModule } from "../create-user/create-user-detail/create-user-detail.module";
import { CreateUserModule } from "./create-user.module";
import { SelectGroupMulti } from "../select-group-multi/select-group-multi.component.i";
import { CreateDetailUserComponent } from "./create-user-detail/create-user-detail.component";
@Component({
  selector: "cie-create-user",
  template: `
    <div fxLayout="row" fxLayoutGap="10px" class="top-page-task-list" fxFlex="100%">
      <cie-button fxLayout="column" ngClass="primary" fxFlex="10%" (click)="onOpenDialogCreateUser($event)">CreateUser</cie-button>
      <cie-button fxLayout="column" ngClass="primary" fxFlex="10%" (click)="onOpenDialogEditUser($event)">EditUser</cie-button>
    </div>
  `,
})
export class CreateUsersComponent {
  constructor(public dialog: MatDialog) {}

  onOpenDialogCreateUser() {
    const dialogRef = this.dialog.open(CreateDetailUserComponent, {
      data: {
        pageLabels: {
          pageTitle: "Create User",
          id: "ID",
          name: "Name",
          status: "Status",
          role: "Role",
          store: "Store",
          cancelButton: "Cancel",
          saveButton: "Save",
          checkbox: "Resetting Password",
        },
        initialData: {
          id: {
            labels: { placeholder: "Input Id", aria: "", type: "textarea" },
            value: "",
            message: "The same ID is being used",
            notValid: false,
          },
          name: {
            labels: { placeholder: "Input Name", aria: "" },
            value: "",
            message: "The same Name is being used",
            notValid: false,
          },
          status: {
            placeholder: "Select Status",
            types: [
              { label: "Active", value: "Active" },
              { label: "DisActive", value: "DisActive" },
            ],
            value: "",
          },
          role: {
            placeholder: "Select Role",
            types: [
              { label: "Administrator", value: "administrator" },
              { label: "Role2", value: "role2" },
              { label: "Role3", value: "role3" },
              { label: "Role4", value: "role4" },
              { label: "Role5", value: "role5" },
            ] as LabelledValue<string>[],
            value: [],
            notValid: false,
            message: "The same Role is being used",
          },
          store: {
            placeholder: "Select Stores",
            types: [
              {
                name: "Area-A",
                items: [
                  { value: "storea1", label: "Store-A-1" },
                  { value: "storea2", label: "Store-A-2" },
                ],
              },
              {
                name: "Area-B",
                items: [
                  { value: "storeb1", label: "Store-B-1" },
                  { value: "storeb2", label: "Store-B-2" },
                ],
              },
            ],
            value: [],
            notValid: false,
            message: "The same Stores is being used",
          },
          passwordConfirm: {
            labels: { placeholder: "Input Id", aria: "", type: "textarea" },
            value: false,
          },
          isCheckCreateEdit: false,
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
  onOpenDialogEditUser() {
    const dialogRef = this.dialog.open(CreateDetailUserComponent, {
      data: {
        pageLabels: {
          pageTitle: "User Edit",
          id: "ID",
          name: "Name",
          status: "Status",
          role: "Role",
          store: "Store",
          cancelButton: "Cancel",
          saveButton: "Save",
          checkbox: "Resetting Password",
        },
        initialData: {
          id: {
            labels: { placeholder: "Input Id", aria: "", type: "textarea" },
            value: "12345001",
            notValid: false,
            validates: [Validators.required],
          },
          name: {
            labels: { placeholder: "Input Name", aria: "" },
            notValid: false,
            validates: [Validators.required],
            value: "Areanga",
          },
          status: {
            placeholder: "",
            types: [
              { label: "Active", value: "active" },
              { label: "DisActive", value: "disActive" },
            ],
            value: "active",
          },
          role: {
            placeholder: "Select Role",
            types: [
              { label: "Administrator", value: "administrator" },
              { label: "Role2", value: "role2" },
              { label: "Role3", value: "role3" },
              { label: "Role4", value: "role4" },
              { label: "Role5", value: "role5" },
            ] as LabelledValue<string>[],
            value: ["role2"],
            notValid: false,
            message: "The same Role is being used",
          },
          store: {
            types: [
              {
                name: "Area-A",
                items: [
                  { value: "storea1", label: "Store-A-1" },
                  { value: "storea2", label: "Store-A-2" },
                ],
              },
              {
                name: "Area-B",
                items: [
                  { value: "storeb1", label: "Store-B-1" },
                  { value: "storeb2", label: "Store-B-2" },
                ],
              },
            ] as SelectGroupMulti[],
            value: ["storea1"],
            notValid: false,
            message: "The same Stores is being used",
          },
          passwordConfirm: {
            labels: { placeholder: "Input Id", aria: "", type: "textarea" },
            value: false,
          },
          isCheckCreateEdit: true,
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
}
storiesOf("Components | Molecules/Create User", module)
  .addDecorator(
    moduleMetadata({
      imports: [
        CommonModule,
        MatDialogModule,
        FlexLayoutModule,
        ButtonModule,
        TranslateModule.forRoot(),
        CreateUserDetailModule,
        CreateUserModule,
        FormsModule,
      ],
      declarations: [CreateUsersComponent],
    }),
  )
  .add("usecase", () => ({
    template: `<cie-create-user></cie-create-user>`,
  }));
