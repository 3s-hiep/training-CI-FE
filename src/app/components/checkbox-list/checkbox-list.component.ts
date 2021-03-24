import { Component, Input, Output, EventEmitter } from "@angular/core";
import { LabelledValue } from "./checkbox-list.i";

@Component({
  selector: "bridge-checkbox-list",
  templateUrl: "./checkbox-list.component.html",
  styleUrls: ["./checkbox-list.component.scss"],
})
export class CheckboxListComponent {
  // tslint:disable: variable-name
  private _checkedItem: string[];
  private _list: LabelledValue<string>[];
  // tslint:enable: variable-name

  @Input() label: string;

  @Input()
  set list(value: LabelledValue<string>[]) {
    this._list = value;
  }
  get list() {
    return this._list || [];
  }

  @Input()
  set checkedItem(value: string[]) {
    this._checkedItem = value;
  }
  get checkedItem() {
    return this._checkedItem || [];
  }

  @Output() checked = new EventEmitter<string[]>();

  public onCheck(check: boolean, content: string) {
    this.checked.emit(check ? [...this.checkedItem, content] : this.checkedItem.filter((item) => item !== content));
  }

  public isChecked(content: string) {
    return this.checkedItem.includes(content);
  }
}
