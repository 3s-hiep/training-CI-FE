import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreateUserData, Data, Labels } from "./create-user-detail.component.i";

@Component({
  selector: "cie-create-user-detail",
  templateUrl: "./create-user-detail.component.html",
  styleUrls: ["./create-user-detail.component.scss"],
})
export class CreateDetailUserComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CreateDetailUserComponent>, @Inject(MAT_DIALOG_DATA) public data: Data) {}
  public labels: Labels;
  public submitted = false;
  public tempFilters: CreateUserData;
  ngOnInit(): void {
    this.labels = this.data.pageLabels;
    this.tempFilters = this.data.initialData;
  }

  onClickCancel() {
    const action = { action: "cancel", data: this.tempFilters };
    this.dialogRef.close(action);
  }

  onClickSave() {
    if (this.checkValid()) {
      const action = { action: "save", data: this.tempFilters };
      this.dialogRef.close(action);
    }
    return false;
  }

  onChangedValue(data: string | [], key: string) {
    this.tempFilters = {
      ...this.tempFilters,
      [key]: {
        ...this.tempFilters[key],
        value: data,
      },
    };
  }
  checkValid() {
    let check = true;
    this.tempFilters.id.notValid = false;
    this.tempFilters.name.notValid = false;
    this.tempFilters.role.notValid = false;
    this.tempFilters.store.notValid = false;
    if (!this.tempFilters.id.value) {
      this.tempFilters.id.notValid = true;
      check = false;
    }
    if (!this.tempFilters.name.value) {
      this.tempFilters.name.notValid = true;
      check = false;
    }
    if (this.tempFilters.role.value.length < 1) {
      this.tempFilters.role.notValid = true;
      check = false;
    }
    if (this.tempFilters.store.value.length < 1) {
      this.tempFilters.store.notValid = true;
      check = false;
    }

    return check;
  }
}
